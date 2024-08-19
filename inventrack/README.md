```markdown
# InvenTrack

 Overview

InvenTrack is a comprehensive store management system designed to streamline inventory, sales, and administrative tasks. It provides an intuitive dashboard for monitoring store performance, managing clerks, handling supply requests, processing payments, and overseeing admins. The system is built using modern web technologies and is tailored to meet the needs of small to medium-sized businesses.

 Features
- Admin Dashboard: Centralized hub for overseeing store operations with visual performance reports.
- Inventory Management: Track products, monitor stock levels, and manage supply requests.
- Sales Tracking: Keep tabs on total revenue, purchases, returns, and top-selling products.
- User Management: Admins can manage clerks and other admins, ensuring proper access control.
- Responsive Design: Optimized for both desktop and mobile devices, providing flexibility for users on the go.

 Technologies Used
- Frontend: React.js, Tailwind CSS
- Backend: Flask, SQLAlchemy
- Charts: Chart.js via `react-chartjs-2`
- Database: SQLite (can be extended to other relational databases)
- API: RESTful APIs with Axios for frontend-backend communication

 Installation and Setup

# Prerequisites
Ensure you have the following installed on your machine:
- Node.js and npm
- Python 3.8 or higher
- Flask
- SQLite (or another preferred database system)

# Backend Setup
1. Clone the Repository:
   git clone https://github.com/ayyub/inventrack.git
   cd inventrack/backend

2. Create a Virtual Environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install Dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Application:
   ```bash
   flask run
   ```

5. Database Initialization:
   Set up the database using SQLAlchemy models and apply any migrations.

# Frontend Setup
1. Navigate to the Frontend Directory:
   ```bash
   cd ../frontend
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Run the Application:
   ```bash
   npm start
   ```

4. Access the Application:
   Visit `http://localhost:3000` in your browser to access the frontend.

 Project Structure
```

InvenTrack/
│
├── backend/                # Python application
│   ├── invenTrack/         # Main Python project folder
│   │   ├── __init__.py
│   │   ├── settings.py     # Project settings
│   │   ├── urls.py         # URL configurations
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── invenApp/           # Python app for InvenTrack
│   │   ├── migrations/     # Database migrations
│   │   ├── models.py       # Python models
│   │   ├── views.py        # View logic
│   │   ├── urls.py         # App-specific URLs
│   ├── manage.py
│   ├── requirements.txt    # Python dependencies
│   └── venv/               # Virtual environment
│
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   └── webpack.config.js   # Webpack configuration
│
└── README.md

```

 Usage
- Admin Dashboard: Accessible through the `/dashboard` route, where you can manage inventory, view performance charts, and handle user management.
- Reports: Access visual reports on sales and product performance within the dashboard.
- Supply Requests: View, approve, or deny supply requests.
- User Management: Add, edit, or remove clerks and admins from the system.

 Customization
# Styling
The application uses Tailwind CSS for styling. You can customize the theme by modifying the `tailwind.config.js` file in the frontend directory.

# Extending the API
New API routes can be added in the `routes.py` file under the backend directory. Ensure that the corresponding frontend components are updated to handle new data.

```markdown
 Contributing to InvenTrack

1. Fork the Repository: Start by forking the InvenTrack repository to your GitHub account.

2. Create a New Branch:
   ```bash
   git checkout -b feature/your-feature
   ```

3. Make Your Changes: Implement your changes in the new branch.

4. Commit Your Changes:
   ```bash
   git commit -m 'Add feature: description of feature'
   ```

5. Push to Your Branch:
   ```bash
   git push origin feature/your-feature
   ```

6. Open a Pull Request: Submit a pull request to the main repository for review.
```

 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

 Contact
For inquiries, suggestions, or contributions, feel free to contact [InvenTrack].
```

