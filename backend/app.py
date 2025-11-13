from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATA_FILE = os.path.join(os.path.dirname(__file__), "data.json")

if not os.path.exists(DATA_FILE):
    initial_data = {
        "flowers": [
            {"id": 1, "name": "Роза", "category": "Букеты", "price": 500, "description": "Красивый букет роз", "image": "https://hotynec.sellflower.ru/wa-data/public/shop/products/67/04/467/images/613/613.750x0.webp"},
            {"id": 2, "name": "Тюльпан", "category": "Цветы", "price": 300, "description": "Яркие весенние тюльпаны", "image": "https://i.pinimg.com/originals/b1/ac/57/b1ac57a8303ffac34e1f459630ca91fd.jpg"},
            {"id": 3, "name": "Орхидея", "category": "Комнатные", "price": 800, "description": "Элегантная орхидея", "image": "https://i.pinimg.com/736x/fa/87/0f/fa870fe7d8cc9954681b63e9a99539db.jpg"},
            {"id": 4, "name": "Пион", "category": "Букеты", "price": 600, "description": "Нежный ароматный пион", "image": "https://main-cdn.sbermegamarket.ru/big1/hlr-system/136/230/781/925/192/6/100064401698b0.jpg"}
        ],
        "orders": []
    }
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(initial_data, f, ensure_ascii=False, indent=2)

def read_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def write_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route("/api/flowers")
def get_flowers():
    data = read_data()
    return jsonify(data["flowers"])

@app.route("/api/order", methods=["POST"])
def make_order():
    order = request.json
    data = read_data()
    order["date"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data["orders"].append(order)
    write_data(data)
    return jsonify({"message": "Заказ успешно оформлен!"})

@app.route("/api/orders")
def get_orders():
    data = read_data()
    return jsonify(data["orders"])

@app.route("/api/login", methods=["POST"])
def login():
    credentials = request.json
    username = credentials.get("username")
    password = credentials.get("password")

    users = [{"username": "admin", "password": "admin"}]

    user = next((u for u in users if u["username"] == username and u["password"] == password), None)

    if user:
        return jsonify({"success": True, "username": username})
    else:
        return jsonify({"success": False, "message": "Неверный логин или пароль"}), 401

if __name__ == "__main__":
    app.run(debug=True)
