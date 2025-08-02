# 🌶️ Siga o Pimenta

Aplicação web para rastrear a localização do Pimenta durante eventos como o Hacktown!

## Como funciona

- **Página pública** (`index.html`): Qualquer pessoa pode ver onde o Pimenta está
- **Página admin** (`admin.html`): Só o Pimenta pode atualizar sua localização usando um token
- **API Backend**: Flask com endpoints para consultar e atualizar localização

## Como rodar

### Backend
```bash
cd backend
pipenv install
pipenv shell
python app.py
```

### Frontend
Abra os arquivos HTML diretamente no navegador ou use um servidor local:
```bash
cd frontend
python -m http.server 8000
```

Depois acesse:
- http://localhost:8000 - Página pública
- http://localhost:8000/admin.html - Área do Pimenta

## Configuração

- Token padrão: `pimenta123` (configurável no arquivo `.env`)
- API roda na porta 5000
- Frontend pode rodar em qualquer porta

## Recursos

- ✅ **PWA (Progressive Web App)**: Pode ser instalado no iPhone como app
- ✅ **Notificações Push**: Lembretes automáticos a cada 30 minutos
- ✅ **Interface responsiva**: Funciona bem no mobile
- ✅ **Localização em tempo real**: Atualização automática

## Como instalar no iPhone

1. Abra o site no Safari
2. Toque no botão "Compartilhar" 
3. Selecione "Adicionar à Tela de Início"
4. O app aparecerá como um ícone na tela inicial

## Próximos passos

- [ ] Adicionar banco de dados para histórico
- [ ] Melhorar autenticação
- [ ] Adicionar mapa visual
- [ ] Deploy em produção