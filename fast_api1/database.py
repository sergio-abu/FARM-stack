from model import Todo

# MONGODB driver
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient("CONNECT YOUR MONGODB CONNECTION STRING HERE")
database = client.TodoList
collection = database.todo


async def fetch_one_todo(title: str):
    document = await collection.find_one({"title": title})
    return document

async def fetch_all_todos():
    todos = []
    async for document in collection.find({}):
        todos.append(Todo(**document))
    return todos

async def create_todo(todo: Todo):
    document = todo.dict()
    result = await collection.insert_one(document)
    return document

async def update_todo(title: str, description: str):
    await collection.update_one({"title": title}, {"$set": {"description": description}})
    document = await collection.find_one({"title": title})
    return document

async def remove_todo(title: str):
    await collection.delete_one({"title": title})
    return True

