<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</head>
    <body>
    <div class="wrapper fadeInDown">
        <div id="formContent">
        <!-- Tabs Titles -->

        <!-- Icon -->
        <div class="fadeIn first">
            <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
        </div>

        <!-- Login Form -->
        <form action="{{url('xuly')}}" method="post">
            @csrf
            @method('POST')
            <input type="text" id="login" value="{{old('name')}}" class="fadeIn second" name="name" placeholder="login"> <br/>
            @error('name')
                <div class="alert alert-danger">{{ $message }}</div>
            @enderror
            <input type="text" id="password"  value="{{old('email')}}" class="fadeIn third" name="email" placeholder="gmail"> <br/>
            @error('email')
                <div class="alert alert-danger">{{ $message }}</div>
            @enderror
            <input type="password" id="password" class="fadeIn third" name="password" placeholder="password"> <br/>
            @error('password')
                <div class="alert alert-danger">{{ $message }}</div>
            @enderror
            <input type="submit" name="login" class="fadeIn fourth" value="Log In">
        </form>
        </div>
    </div>

</body>
</html>

