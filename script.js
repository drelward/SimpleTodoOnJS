function createElement(tag,obj,...children){
	const element=document.createElement(tag);

	Object.keys(obj).forEach(prop=> element[prop]=obj[prop]);

	if(children.length > 0){
		children.forEach(child =>{
			if(typeof child === 'string'){
				child=document.createTextNode(child);
			}

			element.appendChild(child);
		})
	}

	return element;
}

function createListElement(value){
	const check=createElement('input',{type:'checkbox',className:'checkbox'});
	const label =createElement('label',{className:'title'},value);
	const input=createElement('input',{type:'text',className:'textfield'});
	const editButton=createElement('button',{className:'edit'},'Изменить');
	const deleteButton=createElement('button',{className:'delete'},'Удалить');
	const liItem=createElement('li',{className:'todo-item'},check,label,input,editButton,deleteButton);

	editTodoItem(liItem);

	return liItem;
}

function editTodoItem(listItem){
	const check= listItem.querySelector('.checkbox');
	const editButton=listItem.querySelector('.edit');
	const deleteButton=listItem.querySelector('.delete');

	check.addEventListener('change',toggleTodoItem);
	editButton.addEventListener('click',editListItem);
	deleteButton.addEventListener('click',deleteListItem);

}


function toggleTodoItem(){
	this.parentElement.classList.toggle('completed');

}

function editListItem(){
	const parent= this.parentElement;
	const field=parent.querySelector('.textfield');
	const title=parent.querySelector('.title');
	const isEditing=parent.classList.contains('editing');

	if(isEditing){
		title.innerText=field.value;
		this.innerText='Изменить';
	}else{
		field.value=title.innerText;
		this.innerText='Сохранить';
	}

	parent.classList.toggle('editing');
	
}


function deleteListItem(){
	const parent= this.parentElement;
	list.removeChild(parent);
	
}


function addEvent(event){
	event.preventDefault();

	if(editInput.value === '') return alert('Введите название задачи.');

	const listItem = createListElement(editInput.value);

	list.appendChild(listItem);

	editInput.value = '';


}

const list= document.getElementById('todo-list');
const editInput=document.getElementById('add-input');
const editForm=document.getElementById('todo-form');
const everyItem=document.querySelectorAll('.todo-item');

function main(){
editForm.addEventListener('submit', addEvent);
everyItem.forEach(item => editTodoItem(item));
}

main();
