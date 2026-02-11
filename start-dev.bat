@echo off
echo Starting FavourFlix-AI Development Environment
echo.

REM Start backend
echo Starting Backend Server...
cd backend

if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

call venv\Scripts\activate
pip install -q -r requirements.txt
start cmd /k "uvicorn app.main:app --reload"
cd ..

REM Start frontend
echo Starting Frontend Development Server...
cd frontend

if not exist "node_modules" (
    echo Installing Node dependencies...
    call npm install
)

start cmd /k "npm run dev"
cd ..

echo.
echo Development servers started!
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:5173
echo   API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause >nul
