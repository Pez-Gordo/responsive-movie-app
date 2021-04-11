$(document).ready(function(){

    var apikey = "8b8983ad"
    
    $("#movieForm").submit(function(event) {

        event.preventDefault()

        var movie = $("#movie").val()
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
                                <table>
                                    <tr>
                                        <td class="tdkey"><strong>Title</strong></td><td>${data.Title}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Release Date</strong></td><td>${data.Released}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Length</strong></td><td>${data.Runtime}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Genre</strong></td><td>${data.Genre}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Director</strong></td><td>${data.Director}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Actors</strong></td><td>${data.Actors}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Awards</strong></td><td>${data.Awards}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Recaudation</strong></td><td>${data.BoxOffice}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Language</strong></td><td>${data.Language}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Production</strong></td><td>${data.Production}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>IMDb Rating</strong></td><td>${data.imdbRating}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Votes</strong></td><td>${data.imdbVotes}</td>
                                    </tr>
                                    <tr>
                                        <td class="tdkey"><strong>Synopsis</strong></td><td>${data.Plot}</td>
                                    </tr>
                                         
                                </table>
                            </div>
                        </div>
                        `;  

                        $("#result").html(result)
                        $('#movie').val('')

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
                    }
                }
        })

    })

    
})