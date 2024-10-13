import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "../services/authService";
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import CustomLoader from "../components/ui/CustomLoader";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;

  // Handle input change
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await signin(email, password);

      if (!data || !data.jwt_token) {
        setError("Failed to sign in: Invalid response from server");
        setIsLoading(false);
        return;
      }

      // Save the JWT token and user info
      localStorage.setItem("jwt_token", data.jwt_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: data.user_id,
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
        }),
      );

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError(err.response?.data?.message || "Signin failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or&nbsp;
            <Link
              to="/signup"
              className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
            >
              create an account
            </Link>
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-2xl bg-white shadow-xl p-8 space-y-6">
            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="you@student.school.edu"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <Label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </Label>
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <CustomLoader />
                  <span className="ml-2">Signing in...</span>
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
