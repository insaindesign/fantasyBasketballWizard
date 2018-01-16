---Recommended way to install Django---
1. Install pip. The easiest is to use the standalone pip installer. If your distribution already has pip installed, you might need to update it if it’s outdated. If it’s outdated, you’ll know because installation won’t work.

2. Take a look at virtualenv and virtualenvwrapper. These tools provide isolated Python environments, which are more practical than installing packages systemwide. They also allow installing packages without administrator privileges. The contributing tutorial walks through how to create a virtualenv.

3. After you’ve created and activated a virtual environment, enter the command   pip3 install Django    at the shell prompt.

---Run Server---
navigate to backend/ in the terminal and run   python3 manage.py runserver
open browser to http://localhost:8000/test (this runs the function in backend/wizard/views.py)
