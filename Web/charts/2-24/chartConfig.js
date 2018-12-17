var api_key = 'rshnphwnqrnhfkxpzjrc'
      axios({
        method: 'post',
        url: 'https://api.flex.io/v1/me/pipes/tw_ads_stdy_2_24/run',
        headers: {
          Authorization: 'Bearer ' + api_key
        }
      })
      .then(response => {
        var ctx = document.getElementById('24Feb').getContext('2d')
        ctx.height = 100
        window.my_chart = new Chart(ctx, {
          type: 'bar',
          data: response.data,
          options: 
          {
            responsive: true,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },
            scales: 
            {
                xAxes: 
                [{
                    ticks: {
                        display : false
                    }
                }],
                yAxes: 
                [{
                    ticks: {
                        fontColor: "white"
                    }
                }],
            },
            
        }
        })
      })
      .catch(response => {
      })