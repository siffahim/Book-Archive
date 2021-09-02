let loader = document.querySelector('#load');
loader.style.display = 'none';
//warning message4
let warning = document.querySelector('#warning');
warning.style.display = 'none';

const searchBook = async () => {
    const searchField = document.querySelector('#input-Field');
    const searchText = searchField.value;
    loader.style.display = 'block';
    searchField.value = '';
    if (searchText === '') {
        warning.style.display = 'block';
        loader.style.display = 'none'
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
    
    const container = document.querySelector('#container');
    container.textContent = '';

    const book = books.docs
    const searchResult = book.length
    //total search
    const totalSeach = document.querySelector('#totalSearch');
    totalSeach.innerText = `${searchResult} of ${books.numFound}`

    
    if (book.length === 0) {

        warning.style.display = 'block';
    }
    else {
        book.forEach(book => {
            const div = document.createElement('div');
            div.className = 'col';
            div.innerHTML = `
                <div class="col">
                    <div class="card h-100 text-center">
                        <div class="card-body">
                            <img src=' https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg' height='160px'/>
                            <h6 class='mt-3'>Book Name</h6>
                            <p class="text-muted">${book.title.substr(0,40)}</p>
                            <h6>Book Author</h6>
                            <p class="text-muted">${book.author_name[0]}</p>
                            <h6>Book Publisher</h6>
                            <p class="text-muted">${book.publisher[0]}</p>
                            <h6>First Publisher Date</h6>
                            <p class="text-muted">${book.first_publish_year}</p>
                        </div>
                    </div>
                </div>
            `;
    
            container.appendChild(div)
        })
        warning.style.display = 'none';
     }
        
}