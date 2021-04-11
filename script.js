$(document).ready(function(){

    var apikey = "8b8983ad"
    var prevQueries = []
    var cont = 0
    $("#movieForm").submit(function(event) {

        event.preventDefault()

        var movie = $("#movie").val()
        prevQueries.push(movie)

        var url = "https://www.omdbapi.com/?plot=full&apikey=" + apikey

        $.ajax({
            method: "GET",
            url: url + "&t=" + movie,
            success:
                function (data) {

                    console.log(data)
                    
                    if (data.Title) {
                        // In case of success:
                        result = `
                        <div class="contenedor-principal">
                        <div class="contenedor">
                        <img src="${data.Poster}" class="img-thumnail" width="300" height="480" />
                        </div>
                            <div class="contenedor">
                                <h6><strong>Title    --> </strong>${data.Title}</h6>
                                <h6><strong>Type --> </strong>${data.Type}</h6>
                                <h6><strong>Release Date --></strong> ${data.Released}</h6>
                                <h6><strong>Length --></strong> ${data.Runtime}</h6>
                                <h6><strong>Genre --></strong> ${data.Genre}</h6>
                                <h6><strong>Director --> </strong>${data.Director}</h6>
                                <h6><strong>Actors --></strong> ${data.Actors}</h6>
                                <h6><strong>Awards --></strong> ${data.Awards}</h6>
                                <h6><strong>Recaudation --></strong> ${data.BoxOffice}</h6>
                                <h6><strong>Language --> </strong>${data.Language}</h6>
                                <h6><strong>Production --></strong> ${data.Production}</h6>
                                <h6><strong>IMDb Rating --></strong> ${data.imdbRating}</h6>
                                <h6><strong>Number of votes --></strong> ${data.imdbVotes}</h6>
                                <h6><strong>Synopsis --></strong> ${data.Plot}</h6>
                            </div>
                        </div>
                        `;  

                        $("#result").html(result)
                        $('#movie').val('')
                        cont = prevQueries.length -1
                        console.log(prevQueries)

                    } else {
                        // in case of error:
                        result = `
                        <div class="contenedor-principal">
                            <div class="contenedor"><br>
                                Sorry, no matches found. Please check your query.<br><br>
                                <img src="patan.png" class="img-thumnail" width="203" height="311" />
                            </div>
                        </div>
                        `
                        var melodia = document.createElement("audio");
                        melodia.src = "./risa-patan.mp3";
                        melodia.volume = .2;
                        function playSonido(s) {
                            s.currentTime = 0;
                            s.play();
                        }
                        playSonido(melodia);
                        $("#result").html(result)
                        cont = prevQueries.length -1
                        console.log(prevQueries)
                    }
                }
        })

    })

    document.addEventListener('keydown', function(e) {
        
        if(e.code == "ArrowUp") {
            if(cont >= 0) {
                $('#movie').val(prevQueries[cont])
                if(cont > 0)
                    cont--
            }
        }
        if(e.code == "ArrowDown") {
            if(cont <= prevQueries.length){
                $('#movie').val(prevQueries[cont])
                if(cont < prevQueries.length -1)
                    cont++
            }
        }

    })
})