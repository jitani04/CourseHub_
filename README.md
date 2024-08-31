# CourseHub

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Node.js and npm (Node package manager)

### Setting Up the Development Environment

#### Django Backend

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Elias0127/CourseHub.git
   cd CourseHub
   ```

2. **Create a Virtual Environment:**

   ```bash
   python3 -m venv venv
   ```

3. **Activate the Virtual Environment:**

   - **For macOS/Linux:**

   ```bash
   source venv/bin/activate
   ```

   - **For Windows:**

   ```bash
   venv\Scripts\activate
   ```

4. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Apply Migrations:**

   ```bash
    python manage.py migrate
   ```

6. **Run the Development Server:**

   ```bash
   python manage.py runserver
   ```
