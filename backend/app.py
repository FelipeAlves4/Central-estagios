"""
    Para usar o banco de dados, navegue até a pasta backend, depois instale
    as bibliotecas: flask, flask_cors, flask_sqlalchemy 
    e execute o comando: python app.py
"""


from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import check_password_hash,generate_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///central_estagios.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, resources={r"/api/*": {"origins": "*"}}) # Permitir requisições de qualquer origem

db = SQLAlchemy(app)


# Modelo de Usuário
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    senha = db.Column(db.String(100), nullable=False)
# Recriação do banco de dados (caso necessário)
def recreate_db():
    with app.app_context():
        db.drop_all()  # Apaga todas as tabelas existentes
        db.create_all()  # Recria todas as tabelas com a nova estrutura

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validação básica
    if not data or not data.get('usuario') or not data.get('email') or not data.get('senha'):
        return jsonify({"error": "Todos os campos são obrigatórios"}), 400

    # Verifica se o e-mail ou usuário já existe
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "E-mail já cadastrado"}), 400
    if User.query.filter_by(usuario=data['usuario']).first():
        return jsonify({"error": "Usuário já cadastrado"}), 400

    # Hash da senha
    hashed_password = generate_password_hash(data['senha'], method='pbkdf2:sha256')

    # Cria novo usuário
    new_user = User(
        usuario=data['usuario'],
        email=data['email'],
        senha=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuário registrado com sucesso"}), 201

#Endpoint para login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    # Verificar se os campos usuário e senha foram enviados
    if not data or not data.get('usuario') or not data.get('senha'):
        return jsonify({"error": "Usuário e senha são obrigatórios"}), 400

    # Buscar o usuário pelo nome de usuário
    user = User.query.filter_by(usuario=data['usuario']).first()

    # Verificar se o usuário existe e se a senha está correta
    if user and check_password_hash(user.senha, data['senha']):
        return jsonify({"message": "Login realizado com sucesso"}), 200
    else:
        return jsonify({"error": "Usuário ou senha incorretos"}), 401
# Modelo de Currículo
class Curriculo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    experiencia = db.Column(db.Text, nullable=False)
    educacao = db.Column(db.Text, nullable=False)
    habilidades = db.Column(db.Text, nullable=False)

# Endpoint para cadastrar currículo
@app.route('/api/curriculo', methods=['POST'])
def cadastrar_curriculo():
    data = request.get_json()

    novo_curriculo = Curriculo(
        nome=data['nome'],
        experiencia=data['experiencia'],
        educacao=data['educacao'],
        habilidades=data['habilidades']
    )

    db.session.add(novo_curriculo)
    db.session.commit()

    return jsonify({"message": "Currículo cadastrado com sucesso"}), 201

# Rota para pegar dados do perfil
@app.route('/api/profile', methods=['GET'])
def get_profile():
    user_id = 1  
    profile = User.query.filter_by(user_id=user_id).first()

    if profile:
        return jsonify({
            'name': profile.name,
            'course': profile.course,
            'institution': profile.institution,
            'email': profile.email,
            'phone': profile.phone,
            'skills': profile.skills.split(','),
            'experience': profile.experience.split(','),
            'photo': profile.photo
        })
    return jsonify({'error': 'Perfil não encontrado'}), 404

# Rota para atualizar dados do perfil
@app.route('/api/profile', methods=['PUT'])
def update_profile():
    data = request.json
    user_id = 1  
    profile = User.query.filter_by(user_id=user_id).first()

    if profile:
        profile.name = data.get('name', profile.name)
        profile.course = data.get('course', profile.course)
        profile.institution = data.get('institution', profile.institution)
        profile.email = data.get('email', profile.email)
        profile.phone = data.get('phone', profile.phone)
        profile.skills = ','.join(data.get('skills', profile.skills.split(',')))
        profile.experience = ','.join(data.get('experience', profile.experience.split(',')))
        profile.photo = data.get('photo', profile.photo)

        db.session.commit()

        return jsonify({'message': 'Perfil atualizado com sucesso!'})
    return jsonify({'error': 'Perfil não encontrado'}), 404

# Função para criar o banco de dados
def create_db():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    create_db()  # Criar o banco de dados quando o script for executado
    app.run(debug=True)
