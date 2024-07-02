from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from models import create_user, find_user, save_contact_message
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow CORS for your specific API endpoints

# Configure the generative AI model
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

@app.route('/api/chat', methods=['POST'])
def chat_endpoint():
    user_message = request.json.get('message')
    response = chat.send_message(user_message, stream=True)
    bot_reply = ''.join([chunk.text for chunk in response])
    return jsonify({'reply': bot_reply})

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data['name']
    password = data['password']
    create_user(name, password)
    return jsonify({"message": "User created successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data['name']
    password = data['password']
    user = find_user(name)
    if user and user['password'] == password:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 400

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data['name']
    email = data['email']
    message = data['message']
    
    if not name or not email or not message:
        return jsonify({'error': 'Invalid input'}), 400

    save_contact_message(name, email, message)

    return jsonify({'success': True}), 200

@app.route('/plot/<filename>')
def get_plot(filename):
    return send_from_directory('plots', filename)

@app.route('/plot/sa-bar.png')
def plots():
    return send_file('../plots/sa-bar.png')

@app.route('/plot/sa-pie.png')
def plots1():
    return send_file('../plots/sa-pie.png')

@app.route('/plot/sa-pie1.png')
def plots2():
    return send_file('../plots/sa-pie1.png')

@app.route('/plot/sa-bar1.png')
def plots3():
    return send_file('../plots/sa-bar1.png')

if __name__ == '__main__':
    app.run(debug=True)
