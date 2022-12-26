from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Todo

# app object
app = FastAPI()

from database import fetch_one_todo, fetch_all_todos, create_todo, update_todo, remove_todo


origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# root endpoint
@app.get('/')
def index():
    return {'Hi': 'there!'}

# get todo
@app.get('/api/todo')
async def get_todo():
    response = await fetch_all_todos()
    return response

# get todo by title
@app.get('/api/todo{title}', response_model=Todo)
async def get_todo_by_title(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Todo {title} doesn't exist")

# post todo
@app.post('/api/todo', response_model=Todo)
async def post_todo(todo:Todo):
    response = await create_todo(todo)
    if response:
        return response
    raise HTTPException(status_code=400, detail=f"Bad request")

# update todo
@app.put('/api/todo/{title}', response_model=Todo)
async def update_todo_by_title(title: str, desc: str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Todo {title} doesn't exist")


# delete todo
@app.delete('/api/todo/{title}')
async def delete_todo_by_title(title):
    response = await remove_todo(title)
    if response:
        return "deleted successfully"
    raise HTTPException(status_code=404, detail=f"Todo {title} doesn't exist")

