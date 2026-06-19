function Hero() {
    return (
        <div class="relative w-full h-80 overflow-hidden">

            <img src="src/assets/dining.jpg" alt="Card background"
                class="w-full h-full object-cover" />


            <div class="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>


            <div class="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                <h1 class="text-3xl font-bold">Fine Dining, Your Table</h1>
                <p class="text-sm text-gray-400">Browse our menu and order directly from your table

                </p>
            </div>

        </div>
        



    )
}

export default Hero