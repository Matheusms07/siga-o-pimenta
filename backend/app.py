from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Armazenamento simples em memória (depois pode migrar para BD)
pimenta_location = {
    "local": "Ainda não enviou localização",
    "timestamp": None,
    "descricao": ""
}

# Token simples para autenticação do Pimenta
PIMENTA_TOKEN = os.getenv('PIMENTA_TOKEN', 'pimenta123')

@app.route('/api/location', methods=['GET'])
def get_location():
    """Endpoint público para ver onde o Pimenta está"""
    return jsonify({
        "local": pimenta_location["local"],
        "timestamp": pimenta_location["timestamp"],
        "descricao": pimenta_location["descricao"]
    })

@app.route('/api/location', methods=['POST'])
def update_location():
    """Endpoint para o Pimenta atualizar sua localização"""
    data = request.get_json()
    
    # Verificação simples de token
    if data.get('token') != PIMENTA_TOKEN:
        return jsonify({"error": "Token inválido"}), 401
    
    if not data.get('local'):
        return jsonify({"error": "Local é obrigatório"}), 400
    
    pimenta_location["local"] = data["local"]
    pimenta_location["timestamp"] = datetime.now().isoformat()
    pimenta_location["descricao"] = data.get("descricao", "")
    
    return jsonify({"message": "Localização atualizada com sucesso!"})

@app.route('/api/health', methods=['GET'])
def health():
    """Health check"""
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)