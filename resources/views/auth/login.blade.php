@extends('layouts.app')

@section('content')
<div class="text-center">
    <form class="form-signin" method="POST" action="{{ route('login') }}">
        @csrf
        <img src="{{ asset('images/tradesoft_logo.png') }}" alt="logo" width="200" height="120">
        <h1 class="h3 mb-3 font-weight-normal">Please Login</h1>

        <div>
            <label for="email" class="sr-only">{{ __('E-Mail Address') }}</label>
            <input type="email" id="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" placeholder="Email address" required autofocus>
            
            @if ($errors->has('email'))
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
            @endif
        </div>

        <div>
            <label for="password" class="sr-only">{{ __('Password') }}</label>
            <input type="password" id="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" placeholder="Password" required>
            
            @if ($errors->has('password'))
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
            @endif
        </div>
        <br>
        <div class="checkbox mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                <label class="form-check-label" for="remember">
                {{ __('Remember Me') }}
                </label>
            </div>
        </div>

        <button class="btn btn-lg btn-primary btn-block" type="submit">
            {{ __('Login') }}
        </button>

        <a class="btn btn-link" href="{{ route('password.request') }}">
            {{ __('Forgot Your Password?') }}
        </a>

        <!-- <p class="mt-5 mb-3 text-muted">&copy; 2018</p> -->
    </form>
</div> 
@endsection
