<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Checkpoint - Korusental Web System</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="h-screen w-screen bg-gray-100">
    @if($status == "success")
        <main class="w-full h-full flex justify-center items-start border">
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
              <div class="flex flex-col text-center w-full mb-20">
                <h2 class="text-xs text-[#FE4342] tracking-widest font-medium title-font mb-1">{{$message}}</h2>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Account has been verified!</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
                @isset($userData)
                <div class="flex flex-col mt-5">
                    <label class="font-semibold text-gray-800">{{$userData['email']}}</label>
                </div>
                <div class="flex mx-auto mt-16">
                    <a href={{$client_url}} class="text inline-flex items-center text-[#FE4342] hover:text-white transition-colors duration-100   border-0 py-2 px-8 focus:outline-none hover:bg-[#FE4342] rounded text-lg">Sign in
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                  </div>
                @else
                    <p>No user data available.</p>
                @endisset 
              </div>
          </section>
    </main>
    @endif
</body>
</html>