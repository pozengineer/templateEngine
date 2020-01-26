
function generateMainHtml() {
    const mainHtmlString =
    `<!DOCTYPE html>
    <html lang="en-us">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>profileGenerator</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/v4-shims.css">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" />

            <link rel="stylesheet" type="text/css" href="../assets/css/reset.css"> 
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="../assets/css/style01.css">

            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            
        </head>

        <body>
            <header>
                <div class="header">
                    <!-- row01 -->
                    <div class="row">
                        <div class="col-md-12">
                            <h1>My 'Pure Awesomeness' Team</h1>
                        </div>
                    </div>
                </div>
            </header>

        </body>
    </html>`
    return mainHtmlString;
}

function generateManagerHtml(data){
    const managerHtmlString =
    `<div class="card managerCard col-md-12" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${data.getName()}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${data.getRole()}</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
        </div>
    </div>`
    return managerHtmlString;
}

function generateEngineerHtml(data){
    const engineerHtmlString =
    `<div class="card engineerCard col-sm-12 col-md-4 col-lg-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${data.getName()}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${data.getRole()}</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
        </div>
    </div>`
    return engineerHtmlString;
}

function generateInternHtml(data){
    const internHtmlString =
    `<div class="card internCard col-sm-12 col-md-4 col-lg-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${data.getName()}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${data.getRole()}</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
        </div>
    </div>`
    return internHtmlString;
}

module.exports = {
    main: generateMainHtml,
    manager: generateManagerHtml,
    engineer: generateEngineerHtml,
    intern: generateInternHtml
};