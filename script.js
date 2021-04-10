$(document).ready(function(){

    var apikey = "8b8983ad"

    $("#movieForm").submit(function(event) {

        event.preventDefault()

        var movie = $("#movie").val()

        var url = "http://www.omdbapi.com/?plot=full&apikey=" + apikey

        $.ajax({
            method: "GET",
            url: url + "&t=" + movie,
            success:
                function (data) {
                    console.log(data)

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


                }
        })

    })
})