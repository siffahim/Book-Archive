let loader = document.querySelector('#load');
loader.style.display = 'none';
//warning message4
let warning = document.querySelector('#warning');
warning.style.display = 'none';

let container = document.querySelector('#container');

//total search
let totalSeach = document.querySelector('#totalSearch');

const searchBook = async () => {
    const searchField = document.querySelector('#input-Field');
    const searchText = searchField.value;
    loader.style.display = 'block';
    searchField.value = '';
    if (searchText === '') {
        warning.style.display = 'block';
        loader.style.display = 'none'
        container.textContent = '';
        totalSeach.innerText = `${0} of ${0}`
    }
    else {

        const url = `https://openlibrary.org/search.json?q=${searchText}`

        const respons = await fetch(url);
        const data = await respons.json();
        loader.style.display = 'none';
        warning.style.display = 'none';
        displayBook(data)
     
    }
}

const displayBook = (books) => {
    
    container.textContent = '';
   
    const book = books.docs
    const searchResult = book.length
 
    totalSeach.innerText = `${searchResult} of ${books.numFound}`

    
    if (book.length === 0) {

        warning.style.display = 'block';
        totalSeach.innerText = `${0} of ${0}`
    }
    else {
        book.forEach(book => {
            const div = document.createElement('div');
            div.className = 'col';
            div.innerHTML = `
                <div class="card h-100 text-center">
                    <img src=' https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg'/>
                    <div class="card-body">
                        <h5>${book.title.substr(0,40)}</h5>
                        <div class='info'>
                            <h6 class='text-muted'>Book Author</h6>
                            <p>${book.author_name[0]}</p>
                            <h6 class='text-muted'>Book Publisher</h6>
                            <p>${book.publisher[0]}</p>
                            <h6 class='text-muted'>First Publisher Date</h6>
                            <p>${book.first_publish_year}</p>
                        </div>
                    </div>
                </div>
            `;
    
            container.appendChild(div)
        })
        warning.style.display = 'none';
     }
        
}