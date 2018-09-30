
$.ajax({
	url: '/all',
	method: 'GET'
}).then(function(data){
	var p, ob, necc, form, button, a, table, tr, td;
	for (var i=0; i<data.length; i++){
        ob = data[i];
        form = $('<form>');
        tr = $('<tr>')
        table = $('<table>')
        delButton = $('<input>')
        delForm = $('<form>')
        delInput = $('<input>')
        commentButton = $('<input>')
        commentForm = $('<form>')
        commentInput = $('<input>')

        article = $('<div>')
        input = $('<input>')

        
        article.attr('name', ob._id)
        article.text(ob.title)

        delForm.attr('method', 'POST')
        delForm.attr('action', '/delete')
        delForm.attr('name', ob._id)

        delInput.attr('type', 'hidden')
        delInput.attr('name', 'id')
        delInput.attr('value', ob._id)
        // delInput.attr('type', 'button')

        delButton.attr('type', 'submit')
        delButton.attr('value', 'Delete')

        commentButton.attr('type', 'submit')
        commentButton.attr('value', 'Comment')

        commentForm.attr('method', 'POST')
        commentForm.attr('action', '/addComment')
        // commentForm.attr('name', 'comment')

        commentInput.attr('type', 'text')
        commentInput.attr('name', 'comment')
        commentInput.attr('value', '')
        commentButton.text('Comment')

        p = $('<p>');
        h1 = $('<h1>')


//         <!-- <form method="POST" action="/submit">
//     <input type="text" name="username">name</input>

// </form> -->


        // h1.text(ob.title);
        // p.text(ob.link)
        // submit = $('<button>Submit</button>')

        // $('form').append(h1);
        $('#articles').append(article);
        article.append(delForm)
        delForm.append(delInput)
        delForm.append(delButton)


        article.append(commentForm)
        commentForm.append(commentInput)
        commentForm.append(commentButton)
        // article.append(commentButton)

        // article.append(delButton)


        // $('#articles').append(delButton)

        


    }
    // $('#articles').append(submit)



});


$.ajax({
	url: '/answers',
	method: 'GET'
}).then(function(data){
	var p, ob, necc, form, button, a, table, tr, td;
	for (var i=0; i<data.length; i++){
        ob = data[i];

        console.log(ob)
        // results = []
        // results.push(ob.answer1)
        // results.push(ob.answer2)
        // results.push(ob.answer3)
        // results.push(ob.answer4)
        // results.push(ob.answer5)
        // results.push(ob.answer6)
        // results.push(ob.answer7)
        // results.push(ob.answer8)
        // results.push(ob.answer9)
        // results.push(ob.answer10)
        // console.log(results)

    }

});


