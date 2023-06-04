import get from './module/getEle.js';

;(() => {
  const $toDo = get('input[type="text"]');
  const $form = get('form');
  const $list = get('.list');

  class TodoList {
    no = 1;
    constructor(obj = [{}]){
        this.obj = obj
    }
    
    init(){
      localStorage.clear();
      this.obj = JSON.parse(localStorage.getItem("obj")) || [];
      this.show();
      $form.addEventListener('submit', e => { // 엔터 누르면
        e.preventDefault();
        this.add();
        this.show();
      });
    }

    add(){ // 로컬스토리지 배열에 추가 함수
      this.obj = [
        ...this.obj,
        {
          id: this.no++,
          todo: $toDo.value,
          checked: false
        }
      ];
      localStorage.setItem("obj", JSON.stringify(this.obj));
    }

    delShow(del, id){ // 로컬스토리지 배열에서 삭제 함수
      del.addEventListener('click', e => { // 삭제 버튼 누르면
        this.obj = this.obj.filter(item => item.id !== id);
        localStorage.setItem("obj", JSON.stringify(this.obj));
        this.show();
      });
    }

    show(){ // todolist li 생성 함수
      $toDo.value = ''; // input text 초기화
      $list.innerHTML = ''; // li 초기화
      this.obj.forEach( item => {
        const {id, todo, checked} = item;
        let li = document.createElement('li');
        let check = document.createElement('span');
        check.innerHTML = '&vee;';
        let p = document.createElement('p');
        p.textContent = todo;
        let del = document.createElement('button');
        del.textContent = '삭제';
        li.append(check);
        li.append(p);
        li.append(del);
        $list.append(li);
        if (checked) {
          li.classList.add('check-box');
        }
        check.addEventListener('click', e => {
          check.parentElement.classList.toggle('check-box');
          item.checked = !item.checked;
        });
        this.delShow(del, id); // 삭제 함수
      });
    }
  }
const todolist = new TodoList();
todolist.init();
})();