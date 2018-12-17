var api_key = 'rshnphwnqrnhfkxpzjrc'
      axios({
        method: 'post',
        url: 'https://api.flex.io/v1/me/pipes/tw_ads_stdy_2_01/run',
        headers: {
          Authorization: 'Bearer ' + api_key
        }
      })
      .then(response => {
        var ctx = document.getElementById('1Feb').getContext('2d')
        window.my_chart = new Chart(ctx, {
          type: 'bar',
          data: response.data,
          options: 
          {
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