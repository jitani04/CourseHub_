import React, { useState } from 'react';
import { requestResetPassword } from '../services/authService';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import CustomLoader from "../components/ui/CustomLoader";
import { BookOpen, Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from 'react-router-dom'; 

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await requestResetPassword(email);
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong, please try again.';
      if (errorMessage.includes('Email not found')) {
        setError('The email you entered is not registered. Please try again with a registered email.');
      } else {
        setError(errorMessage);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            No worries, we'll send you reset instructions.
          </p>
        </div>
        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-2xl bg-white shadow-xl p-8 space-y-6">
              <div className="space-y-1">
                <Label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
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
                    <span className="ml-2">Sending...</span>
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl bg-white shadow-xl p-8 space-y-6">
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle className="h-12 w-12" />
              </div>
              <p className="text-center text-gray-700">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions to reset your password.
              </p>
            </div>
          </div>
        )}
        <div className="text-center">
          <Link to="/signin" className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}