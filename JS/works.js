let teamAtm
let userInUse
let hyra
let owner
let ownerName

//NAVBAR KRYSS ANIMATION
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        $(".menu__body").addClass("tillbaka")
        $(".option").css("display", "block", "animation-name", "bounceInLeft");
        menuOpen = true;
        $('#rubrik').css('display', 'none')
        $('#top-nav').css('background', 'transparent')
    } else {
        menuBtn.classList.remove('open');
        $(".menu__body").removeClass("tillbaka");
        $(".option").css("display", "none");
        menuOpen = false;
        $('#rubrik').css('display', 'flex')
    }
})

//NAVBAR OPTION ANIMATION
$(".option").click(function () {
    menuOpen = false;
    menuBtn.classList.remove('open');
    $(".menu__body").removeClass("tillbaka");
    $(".option").css("display", "none");
})

//TOGGLE
let allPages = ["Login", "Register", "Regler", "Monopol", "Profil", "Score", "Board", "Karta", "Gameover"]

let toggle = allPages.forEach(function (onePage) {
    getTeamCash()
    $('.btn' + onePage).click(function () {
        showPage(onePage)
        if (onePage == "Regler") {
            regler.play()
            $('#rubrik').html('SPELREGLER')
                        $('#top-nav').css ('display', 'flex')
        } else if (onePage == "Profil") {
            regler.pause()
            $('#rubrik').html('EGENDOMAR')
                        $('#top-nav').css ('display', 'flex')
        } else if (onePage == "Score"){
            regler.pause()
            $('#rubrik').html('POÄNGTAVLA')
            $('#top-nav').css ('display', 'flex')
            $('#top-nav').css ('background', '#D7E8DC')
        } else {
            $('#rubrik').html('')
            $('#top-nav').css ('background', 'transparent')
        }
    })
})


function showPage(page) {
    for (let i = 0; i < allPages.length; i++) {
        $('#page' + allPages[i]).css({
            display: 'none'
        })
    }
    $('#page' + page).css({
        display: 'flex'
    })
}

//LOGIN
$("#login-container").submit((event) => {
    event.preventDefault()
    let password = $("#login-container input[name='psw']").val()
    let username = $("#login-container input[name='name']").val().toLocaleLowerCase()
    console.log(password, username)
    $.get("PHP/getUser.php")
        .done(function (data) {
            let users = JSON.parse(data)
            console.log(users)
            for (let i = 0; i < users.length; i++) {
                if (users[i].name == username && users[i].password == password) {
                    $(".myMoney").html(users[i].cash)
                    userInUse = users[i].teamID
                    console.log(userInUse)
                    login.play()
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        width: 350,
                        height: 80,
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: false,
                        onOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        text: 'Välkommen ' + username + '!',
                    })
                    showPage("Regler")
                    bytnav()
                    return
                } else if (i + 1 == users.length) {

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        width: 350,
                        height: 80,
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: false,
                        onOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        text: 'Fel användarnamn eller lösenord'
                    })
                }
            }
            $("#username").val("")
            $("#password").val("")
        })
        .fail(function () {
            console.log("error")
        })
})

//REGISTER
$('#register-container').submit(function (event) {
    event.preventDefault()
    let email = $("#register-container input[name='email']").val()
    let pass = $("#register-container input[name='psw']").val()
    let passTest = $("#register-container input[name='pswtest']").val()
    let user = $("#register-container input[name='name']").val().toLocaleLowerCase()
    console.log(email, pass, passTest, user)
    if (pass == passTest) {
        console.log(user, pass, email)

        $.get("PHP/register.php", {
                user: user,
                pass: pass,
                email: email
            })
            .done(function (data) {

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: false,
                    onOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Registrering lyckades!'
                })

                showPage("Login")
            }).fail(function (data) {
                alert("Funkar inte")
            })
    }
})

//Byter nav options

function bytnav() {
    console.log("fsd")
    $(".btnRegister, .btnLogin").removeClass("option");
    $(".btnRegister, .btnLogin").css("display", "none");
    $(".btnProfil, .btnScore, .btnRegler, .btnBoard, .btnKarta").addClass("option");

    $(".option").click(function () {
        menuOpen = false;
        menuBtn.classList.remove('open');
        $(".menu__body").removeClass("tillbaka");
        $(".option").css("display", "none");
        $('#rubrik').css('display', 'flex')
    })

}

//TÄRNING
var cube = document.getElementById('cube');

var min = 1;
var max = 24;
let counter = 0
cube.onclick = function () {
    counter++
    console.log(counter)
    if (counter == 5) {
        counter = 0;
        setTimeout(function () {
            notis.play()
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn-success'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                text: 'Ni har slagit 5 slag. Ni har inkasserat 500 kr.',
                imageUrl: 'Images/ga.png',
                confirmButtonText: 'OK',
            })
        }, 1000)
        get(500, userInUse)

    }
    var xRand = getRandom(max, min);
    var yRand = getRandom(max, min);

    cube.style.webkitTransform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
    cube.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';

    getPos()
    $("#streetID input[name='name']").val("")
    $("#btnBuy, #btnBomb, #btnBuyHouse, #btnTarning").css("display", "none")
}

function getRandom(max, min) {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
}

//Position 
function getPos() {
    for (let i = 0; i < 5; i++) {
        console.log(i)
        $("#hus" + i).css("display", "none")
    }
    $.get("PHP/getCard.php", {})
        .done(function (data) {
            $("#btnPrison, #btn, #btnchans, #btnStation,.station").css("display", "none")
            $("#pricelist").css("display", "flex")
            let card = JSON.parse(data)
            console.log(card[0].teamID)
            let street = card[0].streetName
            let code = card[0].streetID
            $(".streetName").html(street)
            $(".streetNameFront").html(street)
            $(".streetName").val(code)
            let color = "#" + card[0].gatuColor
            $(".houseColor").css("background-color", color)
            $(".houseColor").val(card[0].teamID)
            console.log(street)
            if (street == "Chans" || street == "Allmänning") {
                $("#btnchans").css("display", "block")
            } else if (street == "Fängelse") {
                $("#btnPrison").css("display", "block")
            } else {
                $("#btn").css("display", "block")
            }
            console.log(card[0].nrHouse)
            for (let i = 0; i < card[0].nrHouse; i++) {
                console.log(i)
                $("#hus" + i).css("display", "block")
            }
            let houses = card[0].nrHouse
            $("#rent").val(card[0].nrHouse)
            $.get("PHP/getRent.php", {
                    houses: houses,
                    code: code
                })
                .done(function (data) {
                    let rent = JSON.parse(data)
                    $("#rent").html("HYRA " + rent[0][0] + " KR")
                    hyra = rent[0][0]
                    owner = card[0].teamID
                }).fail(function (data) {
                    console.log("Funkar inte")
                })
            if (card[0].teamID == 0) {
                $("#btnBuy").css("display", "flex")
                $("#btnTarning").css("display", "flex")
            } else if (card[0].teamID == userInUse) {
                $("#btnBuyHouse").css("display", "flex")
                $("#btnTarning").css("display", "flex")
            } else {
                if (code == 6483 || code == 3855 || code == 4374 || code == 8245) {
                    $("#pricelist").css("display", "none")
                    $("#btnStation").css("display", "block")
                    setTimeout(function () {
                        $(".stationText").html("Du har hamnat på en station din motståndare äger, slå tärningen och betala summan av siffran gånger tio.")
                    }, 500)
                } else {
                    $("#pricelist").css("display", "flex")
                    $("#btnBomb").css("display", "flex")
                    $("#btnTarning").css("display", "flex")
                    setTimeout(function () {
                        console.log(hyra, card[0].teamID)
                        get(hyra, card[0].teamID)
                        pay(hyra)
                    }, 400)
                }
            }
        }).fail(function (data) {
            console.log("Funkar inte")
        })
    setTimeout(function () {
        $(".flip-card").css("display", "flex")
        $(".flip-card").css("animation-name", "bounceInBottom")
    }, 1500)
    setTimeout(function () {
        $(".flip-card .flip-card-inner").css("transform", "rotateY(540deg)")
    }, 2500)
}

//Hämtar Prislista
$('#btn').click(function () {
    let codeGuess = $("#streetID input[name='name']").val()
    let code = $(".streetName").val()
    let street = $(".streetName").html()
    console.log(code, codeGuess)
    if (codeGuess == code) {

        $.get("PHP/getPrice.php", {
                code: code
            })
            .done(function (data) {
                if (code == 6483 || code == 3855 || code == 4374 || code == 8245) {
                    console.log('Ingen baksida på station!!')
                    $(".stationText").css("display", "flex")
                    $("#pricelist").css("color", "transparent")
                    $("#rent").css("color", "transparent")
                } else {
                    $(".stationText").css("display", "none")
                    $("#rent").css("color", "#272727")
                    $("#pricelist").css("color", "#272727")
                    let street = JSON.parse(data)
                    $("#house1").html(street[0].oneHouse + " KR")
                    $("#house2").html(street[0].twoHouse + " KR")
                    $("#house3").html(street[0].threeHouse + " KR")
                    $("#house4").html(street[0].fourHouse + " KR")
                    $("#house0").html(street[0].streetPrice + " KR")
                    $("#houseBomb").html(street[0].bomb + " KR")
                    $("#btnBuy").html("KÖP " + street[0].streetPrice + " KR").val(street[0].streetPrice)
    
                    $("#house1").css('text-align', "right")
                    $("#house2").css('text-align', "right")
                    $("#house3").css('text-align', "right")
                    $("#house4").css('text-align', "right")
                    $("#house0").css('text-align', "right")
                    $("#houseBomb").css('text-align', "right")
                }
                kopahus.play()
                let who = $(".houseColor").val()
                console.log(who)
                if (code === codeGuess) {
                    console.log('rätt kod')
                    if (who == 0) {
                        setTimeout(function () {
                            notis.play()
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top',
                                width: 350,
                                height: 100,
                                showConfirmButton: false,
                                timer: 7000,
                                timerProgressBar: false,
                                onOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            Toast.fire({
                                text: 'Gatan är fri! Vill ni köpa den eller slå vidare?'
                            })
                        }, 1000)
                    } else if (who == userInUse) {
                        setTimeout(function () {
                            notis.play()
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top',
                                width: 350,
                                height: 100,
                                showConfirmButton: false,
                                timer: 7000,
                                timerProgressBar: false,
                                onOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            Toast.fire({
                                text: 'Ni äger gatan! Vill ni köpa hus eller slå vidare?'
                            }, 1000)
                        })
                    } else {
                        console.log('felKOOOOOOOD')
                        setTimeout(function () {
                            notis.play()
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top',
                                width: 350,
                                height: 100,
                                showConfirmButton: false,
                                timer: 7000,
                                timerProgressBar: false,
                                onOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            Toast.fire({
                                text: 'Ouch! Någon äger redan gatan. Betala hyra! (OBS! Autogiro)'
                            })
                        }, 1000)
                        setTimeout(function () {
                            get(hyra, card[0].teamID)
                            pay(hyra)
                        }, 400)
                    }
                }

            }).fail(function (data) {
                alert("Funkar inte")
            })

        $(".flip-card .flip-card-inner").css("transform", "rotateY(0deg)")
        $("#cover").css("display", "block")
    }else{
        console.log('fel kod')
        console.log('går hit')
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            width: 350,
            height: 100,
            showConfirmButton: false,
            timer: 7000,
            timerProgressBar: false,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'error',
            text: 'Fel kod'
        })
    }
})

//Bomba
$("#btnBomb").click(function () {
    let hus = $(".streetName").html()

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn-success',
            cancelButton: 'btn-danger'
        },
        buttonsStyling: false
    }) 

    swalWithBootstrapButtons.fire({
        text: 'Är ni säker på att ni vill sabotera ' + hus + "?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'AVBRYT'
    }).then((result) => {
        bomb.play()

        let rent = $("#rent").val()
        let code = $(".streetName").val()
        console.log(rent, code)
        $.get("PHP/bomb.php", {
                rent: rent,
                code: code
            })
            .done(function (data) {
                let street = JSON.parse(data)
                console.log(street[0].zeroHouse, street[0].oneHouse)

            }).fail(function (data) {
                console.log("Funkar inte")
            })
        if (result.value) {
            if (rent == 0)
                swalWithBootstrapButtons.fire(
                    'Fire in the house!',
                    'Du bombade just din motståndares gata och tomten är nu mera fri!'
                )
            else {
                swalWithBootstrapButtons.fire(
                    'Fire in the house!',
                    'Du bombade just din motståndares hus och hyran är nu lägre!'
                )
            }
            $.get("PHP/getPrice.php", {
                    code: code,

                })
                .done(function (data) {
                    let street = JSON.parse(data)
                    pay(street[0].bomb)
                    console.log(street[0].bomb)
                }).fail(function (data) {
                    console.log("Funkar inte")
                })
            $(".flip-card").css("animation-name", "shake")
            setTimeout(function () {
                $(".flip-card").css("display", "none")
            }, 1900)
        }
    })
})

//Köpa
$("#btnBuy").click(function () {
    let hus = $(".streetName").html()
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn-success',
            cancelButton: 'btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Är du säker att du vill köpa ' + hus + "?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'KÖP'
    }).then((result) => {
        let code = $(".streetName").val()
        $.get("PHP/buy.php", {
                user: userInUse,
                code: code
            })
            .done(function (data) {
                let price = $("#btnBuy").val()
                console.log(price)
                pay(price)

            }).fail(function (data) {
                console.log("Funkar inte")
            })
        if (result.value) {
            swalWithBootstrapButtons.fire(
                'Köpt!',
                'Du kan köpa hus till ' + hus + ' under "EGENDOMAR" i menyn.'
            )
            $(".flip-card").css("animation-name", "bounceIndown")
            setTimeout(function () {
                $(".flip-card").css("display", "none")
            }, 1300)
        }
    })
})

//Köpa hus
$("#btnBuyHouse").click(function () {
    $(".btnProfil").click()
})

//Köpa hus
$("#btnTarning").click(function () {
    $(".flip-card").css("animation-name", "bounceIndown")
    setTimeout(function () {
        $(".flip-card").css("display", "none")
    }, 1300)
})

//Kolla vilka gator och hus man äger
$(".btnProfil").click(function () {
    $('.myCapital').empty()
    getTeamCash()
    $.get("PHP/getMyCapital.php", {
            myTeam: userInUse

        })
        .done(function (data) {
            console.log(userInUse)
            let myCapital = JSON.parse(data)
            console.log(myCapital)
            for (let i = 0; i < myCapital.length; i++) {
                if (myCapital.length === '0') {
                    console.log('tom')
                    let noCapitalDiv = document.createElement('div')
                    noCapitalDiv.classList.add("capitalDiv")
                    noCapitalDiv.innerHTML = 'Du äger inget än 😞'
                    $('.myCapital').append(noCapitalDiv)
                } else {
                    console.log(myCapital.length)
                    createCapitalDivs(myCapital)
                }

                function createCapitalDivs() {
                    let capitalDiv = document.createElement('div')
                    capitalDiv.classList.add("capitalDiv")
                    $('.myCapital').append(capitalDiv)

                    let containNameNHouse = document.createElement('div')
                    containNameNHouse.classList.add("containNameNHouse")
                    capitalDiv.append(containNameNHouse)

                    let name = document.createElement('div')
                    name.innerHTML = myCapital[i].streetName
                    containNameNHouse.append(name)


                    let code = myCapital[i].streetID
                    let numberOfHouses = myCapital[i].nrHouse
                    //HÄÄÄÄR
                //skapar divs för husen man äger på varje gata
                let divHouse = document.createElement('div')
                divHouse.classList.add('divHouse')
                containNameNHouse.append(divHouse)


                    for (let a = 0; a < myCapital[i].nrHouse; a++) {
                        let houseDiv = document.createElement('div')
                        houseDiv.classList.add('house')
                        divHouse.append(houseDiv)
                    }

                    let btnBuyProfil = document.createElement('div')
                    btnBuyProfil.classList.add('round-btn')
                    btnBuyProfil.innerHTML = 'KÖP HUS &nbsp;'
                    btnBuyProfil.onclick = function () {
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton: 'btn-success',
                                cancelButton: 'btn-danger'
                            },
                            buttonsStyling: false
                        }) 
                        swalWithBootstrapButtons.fire({
                            title: 'Är du säker på att du vill köpa ett hus?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'KÖP'
                        }).then((result) => {
                            $.get("PHP/buyHouseProfil.php", {
                                    doThis: numberOfHouses,
                                    code: code,
                                    user: userInUse
                                })
                                .done(function (data) {
                                    $.get("PHP/getPrice.php", {
                                            code: code,

                                        })
                                        .done(function (data) {
                                            let street = JSON.parse(data)
                                            pay(street[0].housePrice)
                                            console.log(street[0].housePrice)
                                        }).fail(function (data) {
                                            console.log("Funkar inte")
                                        })
                                    console.log('köpt')
                                    $(".btnProfil").click()

                                }).fail(function (data) {
                                    console.log("Funkar inte")
                                })

                        })

                    }
                    if(numberOfHouses>3){
                        console.log('för många hus'+ numberOfHouses)
                    }else if (code == 6483 || code == 3855 || code == 4374 || code == 8245){
                        console.log('station!')
                    }
                    
                    else{
                        capitalDiv.append(btnBuyProfil)
                        console.log(numberOfHouses)
                    }
                    $.get("PHP/getPrice.php", {
                            code: code,
                        })
                        .done(function (data) {
                            let housePriceList = JSON.parse(data)
                            console.log(housePriceList)

                            let housePriceAmount = document.createElement('div')
                            housePriceAmount.innerHTML = housePriceList[0].housePrice + " KR."
                            btnBuyProfil.append(housePriceAmount)
                        }).fail(function (data) {
                            console.log("Funkar inte")
                        })


                }
            }
            $('.myCapital').append(capitalDiv)
        }).fail(function (data) {
            console.log("Funkar inte att ladda ner dina hus mannen mannen")
        })
})

//Se vad andra äger
$(".btnscore").click(function () {
    $('.capital').empty()
    $.get("PHP/getOthersCapital.php")
        .done(function (data) {
            let capital = JSON.parse(data)
            for (let i = 0; i < capital.length; i++) {
                //FlexDiv som håller både teamstreets och teamDiv
                let teamContainer = document.createElement('div')
                teamContainer.classList.add('teamContainer' + capital[i].teamID)
                $('.capital').append(teamContainer)

                //TeamDiv som innehåller namn, pil och pengarna
                let teamDiv = document.createElement('div')
                teamDiv.classList.add('teamDiv' + capital[i].teamID, 'teamCapital')
                $('.teamContainer' + capital[i].teamID).append(teamDiv)

                //Namn på laget
                let whatTeam = document.createElement('h2')
                whatTeam.innerHTML = capital[i].name
                $('.teamDiv' + capital[i].teamID).append(whatTeam)

                //Pengarna laget har
                let teamMoneyDiv = document.createElement('div')
                teamMoneyDiv.classList.add('teamMoney' + capital[i].teamID, 'teamMoney')
                $('.teamDiv' + capital[i].teamID).append(teamMoneyDiv)

                let amount = document.createElement('h2')
                amount.innerHTML = capital[i].cash
                amount.classList.add('amount')
                let vilketTeam = 'teamDiv' + capital[i].teamID
                console.log(vilketTeam)
                if (capital[i].cash<0){
                    console.log($('.'+ vilketTeam))
                    $('.' + vilketTeam).addClass('bankrutt')
                    teamMoneyDiv.append(amount)
                }else{
                    teamMoneyDiv.append(amount)
                }

                let money = document.createElement('div')
                money.classList.add('money')
                teamMoneyDiv.append(money)

                //Pilen för att öka menyn
                let menyPil = document.createElement('div')
                menyPil.classList.add('menyPil')
                let whatDiv = capital[i].teamID
                menyPil.onclick = function () {
                    let clicks = $(this).data('clicks')
                    if (clicks) {
                        $('.teamStreets' + capital[i].teamID).css({display: "none"})
                    } else {
                        $('.teamStreets' + capital[i].teamID).css({display: "flex" })
                    }
                    $(this).data("clicks", !clicks)
                }
                teamMoneyDiv.append(menyPil)

                createHouses(capital[i].teamID)
            }

        }).fail(function (data) {
            console.log("Funkar inte att ladda ner dina hus mannen mannen")
        })

})

//Skapar husen som andra äger
function createHouses(p) {
    $.get("PHP/teamScore.php", {
            teamAtm: p
        })
        .done(function (data) {
            let score = JSON.parse(data)
            //Skapar div där gatorna samlas
            let teamStreets = document.createElement('div')
            teamStreets.classList.add('teamStreets', 'teamStreets' + p)
            $('.teamContainer' + p).append(teamStreets)
            for (let i = 0; i < score.length; i++) {
                //Skapar divs för varje gata man äger
                let aHouse = document.createElement('div')
                aHouse.classList.add('aHouse')
                aHouse.innerHTML = score[i].streetName
                teamStreets.append(aHouse)
                //skapar divs för husen man äger på varje gata
                let divHouse = document.createElement('div')
                divHouse.classList.add('divHouse')
                aHouse.append(divHouse)

                for (let a = 0; a < score[i].nrHouse; a++) {
                    let houseDiv = document.createElement('div')
                    houseDiv.classList.add('house')
                    divHouse.append(houseDiv)
                }

            }
        }).fail(function (data) {
            console.log("Funkar inte")
        })
}
// Dra pengar 

function pay(price) {
    $(".myMoney").removeClass("pay")
    console.log(price, userInUse)
    console.log(hyra)
    $.get("PHP/pay.php", {
            teamID: userInUse
        })
        .done(function (data) {
            let cash = JSON.parse(data)
            let money = cash - price
            console.log(money, cash, price)
            $(".changeMoney").html("-" + price).css("color", "#dc3739")
            setTimeout(function () {
                $(".changeMoney").html("")
            }, 1300)
            $.get("PHP/updateCash.php", {
                    price: money,
                    teamID: userInUse
                })
                .done(function (data) {
                    console.log(money)
                    $(".myMoney").html(money).counterUp({
                        delay: 10,
                        time: 1000
                    }).addClass("pay")
                    if(money <= 0){
                        $.get("PHP/gameOver.php", {
                            teamID: userInUse
                        })
                        .done(function(data){
                            $.get("PHP/getOwner.php", {
                                owner: owner
                            })
                            .done(function (data) {
                                let whoDis = JSON.parse(data)
                                console.log(whoDis)
                                for (let i=0; i<whoDis.length; i++){
                                    ownerName = whoDis[i].name
                                    if(ownerName === undefined){
                                        $(".whoDidThis").html('Ni köpte för mycket och har ' + money + 'kr')
                                    }else{
                                        $(".whoDidThis").html('Ni landade på ' + ownerName + 's gata och har ' + money + 'kr.')
                                    }
                                }
                            })
                            showPage('Gameover')
                            $("#top-nav").css("display", "none");
                        }).fail(function (data) {
                            console.log("Funkar inte")
                        })
                    }
                }).fail(function (data) {
                    console.log("Funkar inte")
                })
        }).fail(function (data) {
            console.log("Funkar inte")
        })
}
// Dra pengar 

function get(pengar, mot) {
    $(".myMoney").removeClass("get")
    let ID = mot
    $.get("PHP/pay.php", {
            teamID: ID
        })
        .done(function (data) {
            let cash = JSON.parse(data)
            let ne = parseInt(cash) + parseInt(pengar)
            console.log(cash, pengar)
            $.get("PHP/updateCash.php", {
                    price: ne,
                    teamID: ID
                })
                .done(function (data) {

                    if (ID == userInUse) {
                        $(".changeMoney").html("+" + pengar).css("color", "#2d6faa")
                        setTimeout(function () {
                            $(".changeMoney").html("")
                        }, 1300)
                        $(".myMoney").html(ne).counterUp({
                            delay: 10,
                            time: 1000
                        }).addClass("get")
                    }
                }).fail(function (data) {
                    console.log("Funkar inte")
                })
        }).fail(function (data) {
            console.log("Funkar inte")
        })
}
// Chans
$("#btnchans").click(function () {
    $.get("PHP/getAllChans.php", {
    })
    .done(function (data) {
        let allChans = JSON.parse(data)
        let code = $("#streetID input[name='name']").val()
        for(let i=0; i<allChans.length; i++){
            let thisChans = allChans[i].kod
            if(thisChans == code){
                $.get("PHP/chans.php", {
                    code: code
                })
                .done(function (data) {
                    let cash = JSON.parse(data)
                    console.log(cash[0], userInUse)
                    get(cash[0], userInUse)
                    $(".flip-card").css("animation-name", "bounceIndown")
                    setTimeout(function () {
                        $(".flip-card").css("display", "none")
                    }, 1300)
                }).fail(function (data) {
                    console.log("Funkar inte")
                })
            }else if(code == ""){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: false,
                    onOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
        
                Toast.fire({
                    icon: 'error',
                    title: 'Skriv in kod'
                })
            }else{
                console.log('fel chanskod')
            }
        }

    }).fail(function (data) {
        alert("Funkar inte att ladda ner chans")
    })
})

$("#btnPrison").click(function () {
    let code = $("#streetID input[name='name']").val()
    console.log(code)
    if (code === "") {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'error',
            title: 'Skriv in kod'
        })
    } else if(code === '063141742899') {
        $(".flip-card").css("animation-name", "bounceIndown")
        setTimeout(function () {
            $(".flip-card").css("display", "none")
        }, 1300)
    }
    else{
        console.log('du trodde va')
    }
})

$('.round-btn').click(function () {
    knapp.play()
})
$('#cube').click(function () {
    dice.play()
})
$('.menu-btn').click(function () {
    menu.play()
})
$('.menyPil').click(function () {
    menu.play()
})

// station 
$("#btnStation").click(function () {
    let rand = randomInt(1, 6)
    $(".station").html(rand).css("display", "block")
    $("#btnStation").css("display", "none")
    pay(rand * 10)
    get(rand * 10, owner)
    $("#btnTarning").css("display", "flex")
})
function randomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min
}

//Hämtar pengarna laget har
function getTeamCash(){
    $.get("PHP/getUser.php")
    .done(function (data) {
        let users = JSON.parse(data)
        for (let i = 0; i < users.length; i++) {
            if(users[i].teamID == userInUse){
                $(".myMoney").html(users[i].cash)
            }
        }
    })
    .fail(function () {
        console.log("error")
    })
}

//LJUD
kopahus = new Audio("Audio/kopa_hus.mp3")
regler = new Audio("Audio/regler.mp3")
notis = new Audio("Audio/notis.mp3")
login = new Audio("Audio/login.mp3")
counting = new Audio("Audio/counting.mp3")
dice = new Audio("Audio/dice.mp3")
knapp = new Audio("Audio/knapp.mp3")
menu = new Audio("Audio/menu.mp3")
bomb = new Audio("Audio/bomb.mp3")