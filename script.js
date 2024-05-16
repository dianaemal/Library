document.addEventListener("DOMContentLoaded", function(){
    const formSubmit = document.getElementById("submit")
    const form = document.getElementById("popUpForm")
    const button = document.getElementById("button");
    const container = document.getElementById("container");
    const modal = document.getElementById("modal")
    const myLibrary = [];
    
    // make the book object
    function book(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    
    }
   // when the book button is clicked the modal is gonna show up which contains the form
    button.addEventListener("click", ()=>{
        modal.showModal();
    })

    // when sumbit button is clicked 
    formSubmit.addEventListener("click", function(event){
        event.preventDefault()
            
        var title = document.getElementById("bookName").value;
        var author = document.getElementById("Author").value;
        var pages = document.getElementById("Pages").value;
        var selectedOption = document.querySelector('input[name="Read"]:checked');
        // chech if all feilds are filled
        if(!title || !author || !pages || !selectedOption)
        {
            alert("Fill out all the feilds..")
        }
        else if (pages < 1)
        {
            alert("Pages must be more that 1.")
        }
        else{
            //If the radio button in chosen then the value of that button will be assigned to read
            var read = selectedOption.value
            const bookEx = new book(title, author, pages, read);
            myLibrary.push(bookEx);
            form.reset();
            modal.close();
            display()
        }
       
       
    })
    
    function display (){

        //Every time the function is called the container is emptied
        // so it would prevent the same book from being displyaed
        container.textContent = "";
    
        for (var i = 0; i < myLibrary.length; i++)
        {
            //Creat new div for each book
            var newDiv = document.createElement("div");
            newDiv.className = "myDiv"; 
            newDiv.textContent = "";
            container.appendChild(newDiv);
           
            //Add title to the newDiv
            const bookTitle = document.createElement("h3");
            bookTitle.textContent = myLibrary[i]["title"]
            newDiv.appendChild(bookTitle);

            //Add author
            const author = document.createElement("div");
            author.textContent = "Author: " + myLibrary[i]["author"]
            newDiv.appendChild(author);

            //add number of pages
            const pageNumber = document.createElement("div");
            pageNumber.textContent = "Pages: " + myLibrary[i]["pages"]
            newDiv.appendChild(pageNumber);

            //add readStatus
            const readStatus = document.createElement("div");
            readStatus.textContent = "Read: " + myLibrary[i]["read"]
            newDiv.appendChild(readStatus);

            //Every book must have a delete and toggle read button
            const remove = document.createElement("button");
            remove.textContent = "Delete";
            remove.className = "delete"
            newDiv.appendChild(remove);
            //Through data index number we can figure out which index element of the
            //book array to delete, if the delete button of that book is clicked
            remove.setAttribute("data-index-number", i);
            remove.addEventListener("click", function(){
               
                var index = remove.getAttribute("data-index-number");
                myLibrary.splice(index, 1);
                //remove the parent of delete button which is the entire newDiv
                var parentDiv = remove.parentNode;
                parentDiv.remove();
            })
            
            const toggleRead = document.createElement("button");
            toggleRead.textContent = "Toggle read";
            newDiv.appendChild(toggleRead);
            toggleRead.addEventListener("click", () =>{
                if(readStatus.textContent === "Read: read" )
                {
                    readStatus.textContent = "Read: Not read yet";
                }
                else
                {
                    readStatus.textContent = "Read: read";
                }
            })

            
        }


    }
    document.getElementById("cancel").addEventListener("click", ()=>{
        modal.close()
        form.reset();
    
    })

})
