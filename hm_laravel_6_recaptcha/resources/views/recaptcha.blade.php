<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recaptcha</title>

    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>
<body>
    <form action="recaptcha" method="post">
        @csrf
        @method('post')
        <input placeholder="Name" type="text" name="txtName">
        <input placeholder="Password" type="text" name="txtpassword">

        {{-- recaptcha --}}
        <div class="g-recaptcha" data-sitekey="{{env('CAPTCHA_KEY')}}"></div>
        {{-- thong bao --}}
        @if ($errors->has('g-recaptcha-response'))
            <strong>{{$errors->first('g-recaptcha-response')}}</strong>
        @endif

        <button type="submit">Login</button>
        <button type="reset">Reset</button>
    </form>
</body>
</html>