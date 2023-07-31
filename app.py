import os

from flask import Flask, redirect, render_template, url_for, request, session
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
import random

# Configure application
app = Flask(__name__)
# Local database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///userinfo.db'
# Online database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://gtezfzjjosnmsm:ffede6d2272df73f786657a7fcba2cfb171d6a37892142eafd89b8ba9c7839b6@ec2-3-217-146-37.compute-1.amazonaws.com:5432/d4dn9nske7ujas'
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
app.config['SECRET_KEY'] = 'lunamoonpie'

# Configure Login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Create user class which stores user info(used for SQL)
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    nickname = db.Column(db.String(20), nullable=False)

# Validate username by checking if it's already taken
def check_username(userInput):
    if User.query.filter_by(username=userInput).first():
        return True

# Load user data
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Quiz list
quizzes = ['Star Wars','Star Wars Planets','Star Wars Quotes','Harry Potter','Harry Potter Spells',
                'Harry Potter Quotes','Superhero','Superhero Secret Identities','Superhero Quotes']
linksToQuizzes = {'Star Wars': 'star-wars-quiz','Star Wars Planets': 'star-wars-planets-quiz',
                'Star Wars Quotes': 'star-wars-quotes-quiz','Harry Potter': 'harry-potter-quiz',
                'Harry Potter Spells': 'harry-potter-spells-quiz', 'Harry Potter Quotes': 'harry-potter-quotes-quiz',
                'Superhero': 'superhero-quiz','Superhero Secret Identities': 'superhero-secret-identities-quiz',
                'Superhero Quotes': 'superhero-quotes-quiz'}

@app.route('/create')
def create():
    db.create_all()
    return 'All tables created'

# Load homepage on start
@app.route("/")
def index():
    quizName = random.choice(quizzes)
    quizLink = linksToQuizzes[quizName]
    return render_template("index.html", quizName=quizName, quizLink=quizLink)

# Register for a new account
@app.route("/register", methods=["GET", "POST"])
def register():
    errorMessage = ""

    if request.method == "POST":
        # Retrieve username and password
        inputName = request.form.get("username")
        inputPassword = request.form.get("password")
        inputConfirm = request.form.get("confirm")
        inputNickname = request.form.get("nickname")

        # Check if all fields are filled out
        if not inputName or not inputPassword:
            return render_template("register.html", errorMessage="Please fill in all fields")
        if not inputNickname:
            inputNickname = inputName
        
        # Check if password is valid
        if len(inputPassword) < 4 or len(inputPassword) > 12:
            return render_template("register.html", errorMessage="Password must be 4-12 characters")

        # Check if username is taken
        if check_username(inputName):
            return render_template("register.html", errorMessage="Username is already taken")
        
        # Check if password confirmation matches
        if inputConfirm != inputPassword:
            return render_template("register.html", errorMessage="Password confirmation doesn't match")
            
        # Save username and encrypted password in database
        hashed_password = bcrypt.generate_password_hash(inputPassword)
        new_user = User(username=inputName, nickname=inputNickname, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect("/login")

    return render_template("register.html", errorMessage=errorMessage)

# Access login page on button press
@app.route("/login", methods=["GET", "POST"])
def login():
    errorMessage = ""

    if request.method == "POST":
        # Retrieve username and password
        inputName = request.form.get("username")
        inputPassword = request.form.get("password")

        # Provide error message if not all fields are filled out
        if not inputName or not inputPassword:
            errorMessage = "Please fill in all fields"
            return render_template("login.html", errorMessage=errorMessage)
        
        # Check if username exists
        user = User.query.filter_by(username=inputName).first()
        if user:
            # Check if password matches
            if bcrypt.check_password_hash(user.password, inputPassword):
                session["logged_in"] = True
                login_user(user)
                session["user_id"] = user
                return redirect("/")
                
    return render_template("login.html")

# Logout on button press
@app.route("/logout")
def logout():

    # Logout and return to homepage
    session["logged_in"] = False
    logout_user()
    return redirect("/")

@app.route("/allquizzes")
def allquizzes():
    quizName1 = quizzes[0]
    quizLink1 = linksToQuizzes[quizName1]
    quizName2 = quizzes[1]
    quizLink2 = linksToQuizzes[quizName2]
    quizName3 = quizzes[2]
    quizLink3 = linksToQuizzes[quizName3]
    quizName4 = quizzes[3]
    quizLink4 = linksToQuizzes[quizName4]
    quizName5 = quizzes[4]
    quizLink5 = linksToQuizzes[quizName5]
    quizName6 = quizzes[5]
    quizLink6 = linksToQuizzes[quizName6]
    quizName7 = quizzes[6]
    quizLink7 = linksToQuizzes[quizName7]
    quizName8 = quizzes[7]
    quizLink8 = linksToQuizzes[quizName8]
    quizName9 = quizzes[8]
    quizLink9 = linksToQuizzes[quizName9]
    return render_template("allquizzes.html", quizName1=quizName1, quizLink1=quizLink1, quizName2=quizName2, quizLink2=quizLink2,
                           quizName3=quizName3, quizLink3=quizLink3, quizName4=quizName4, quizLink4=quizLink4,
                           quizName5=quizName5, quizLink5=quizLink5, quizName6=quizName6, quizLink6=quizLink6,
                           quizName7=quizName7, quizLink7=quizLink7, quizName8=quizName8, quizLink8=quizLink8,
                           quizName9=quizName9, quizLink9=quizLink9)

@app.route("/harry-potter-quiz")
def harryPotterQuiz():
    quizName = "Harry Potter Quiz"
    category = "magic"
    script =  "harrypotterquiz.js"
    return render_template("surveys.html", quizName=quizName, category=category, script=script)

@app.route("/harry-potter-spells-quiz")
def harryPotterSpellsQuiz():
    quizName = "Harry Potter Spells Quiz"
    category = "magic"
    script = "harrypotterspellsquiz.js"
    return render_template("surveys.html", quizName=quizName, category=category, script=script)

@app.route("/harry-potter-quotes-quiz")
def harryPotterQuotesQuiz():
    quizName = "Harry Potter Quotes Quiz"
    category = "magic"
    script = "harrypotterquotesquiz.js"
    return render_template("surveys.html", quizName=quizName, category=category, script=script)

@app.route("/star-wars-quiz")
def starWarsQuiz():
    quizName = "Star Wars Quiz"
    category = "space"
    script = "starwarsquiz.js"
    return render_template("surveys.html", quizName=quizName, category=category, script=script) 

@app.route("/star-wars-planets-quiz")
def starWarsPlanetsQuiz():
    quizName = "Star Wars Planets Quiz"
    category = "space"
    script = "starwarsplanetsquiz.js"
    return render_template("surveys.html", quizName=quizName, category=category, script=script) 

@app.route("/star-wars-quotes-quiz")
def starWarsQuotesQuiz():
    quizName = "Star Wars Quotes Quiz"
    category = "space"
    script = "starwarsquotesquiz.js"
    return render_template("surveys.html", quizName=quizName, category=category, script=script) 

@app.route("/superhero-quiz")
def superheroQuiz():
    quizName = "Superhero Quiz"
    category = "superheroes"
    script = "superheroquiz.js"
    return render_template("surveys.html", quizName=quizName, category=category, script=script)

@app.route("/superhero-secret-identities-quiz")
def superheroSecretIdentitiesQuiz():
    quizName = "Superhero Secret Identities Quiz"
    category = "superheroes"
    script = "superherosecretidentitiesquiz.js"
    return render_template("surveys.html", quizName=quizName, category=category, script=script)

@app.route("/superhero-quotes-quiz")
def superheroQuotesQuiz():
    quizName = "Superhero Quotes Quiz"
    category = "superheroes"
    script = "superheroquotesquiz.js"
    return render_template("surveys.html", quizName=quizName, category=category, script=script)

@app.route("/space")
def space():
    category = "Star Wars"
    quizName1 = "Star Wars"
    quizLink1 = "star-wars-quiz"
    quizName2 = "Star Wars Planets"
    quizLink2 = "star-wars-planets-quiz"
    quizName3 = "Star Wars Quotes"
    quizLink3 = "star-wars-quotes-quiz"
    return render_template("categories.html", quizName1=quizName1, quizName2=quizName2, 
                           quizName3=quizName3, quizLink1=quizLink1, quizLink2=quizLink2, 
                           quizLink3=quizLink3, category=category) 

@app.route("/magic")
def magic():
    category = "Harry Potter"
    quizName1 = "Harry Potter"
    quizLink1 = "harry-potter-quiz"
    quizName2 = "Harry Potter Spells"
    quizLink2 = "harry-potter-spells-quiz"
    quizName3 = "Harry Potter Quotes"
    quizLink3 = "harry-potter-quotes-quiz"
    return render_template("categories.html", quizName1=quizName1, quizName2=quizName2, 
                           quizName3=quizName3, quizLink1=quizLink1, quizLink2=quizLink2, 
                           quizLink3=quizLink3, category=category) 

@app.route("/superheroes")
def superheroes():
    category = "Superheroes"
    quizName1 = "Superhero"
    quizLink1 = "superhero-quiz"
    quizName2 = "Superhero Secret Identities"
    quizLink2 = "superhero-secret-identities-quiz"
    quizName3 = "Superhero Quotes"
    quizLink3 = "superhero-quotes-quiz"
    return render_template("categories.html", quizName1=quizName1, quizName2=quizName2, 
                           quizName3=quizName3, quizLink1=quizLink1, quizLink2=quizLink2, 
                           quizLink3=quizLink3, category=category) 