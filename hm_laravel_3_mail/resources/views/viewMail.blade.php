<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
    <body>
        <form action="testmail" method="post" class="d-block m-6" enctype="multipart/form-data">
            @csrf
            @method('post')
            <div class="form-group">
                <label for="name">Name </label>
                <input id='name' name="txtName" type="text" >
              </div>
            <div class="form-group">
              <label for="file">File </label>
              <input id='file' name="txtFile" type="file" >
            </div>
             <button type="submit" class="btn btn-primary">Submit</button>
          </form>

    </body>
</body>
</html>
