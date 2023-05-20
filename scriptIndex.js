function openNav()
{
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
}

function closeNav()
{
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
}

const url = 'https://www.themuse.com/api/public/jobs?page=' + parseInt(70*Math.random()+1);
let newTab = new Array();

function stonks()
{
    let table = document.createElement('table');

    let field = document.createElement('fieldset');
    field.setAttribute('id', 'weather');
    field.setAttribute('style', 'width:50%; height:400px; float:right; margin-right:50px; margin-top:50px; padding-top:20px;');

    let legend = document.createElement('legend');
    legend.innerHTML = 'Bourse';
    field.appendChild(legend);

    let tab = ['AAPL','SIEGY','AMZN','SSNLF','GOOGL','MSFT','SNAP','META','BAC', 'SBUX','DPZ','BBY','NFLX','DIS']
    let tab_name=['Apple','Siemens','Amazon','Samsung','Google','Microsoft','Snapchat','Meta.Inc','Bank of America','Starbucks',"Domino's Pizza",'Best Buy','Netflix', 'Walt Disney']
    const apiKey='OPVC16R2792Q2VFP';
    let i = Math.round(Math.random()*(tab.length-1));
    const symbol = tab[i];
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        let stockInfo = data['Global Quote'];
        console.log(stockInfo);

        let tr0 = document.createElement('tr');
        let th0 = document.createElement('th');
        th0.setAttribute('style','border: black solid 1px;');
        th0.setAttribute('colspan', '4');
        th0.innerHTML = tab_name[i]; 
        tr0.appendChild(th0);

        let tr1 = document.createElement('tr');
        let td0 = document.createElement('td');
        td0.setAttribute('style','border: black solid 1px;');
        td0.setAttribute('rowspan', '4');
        td0.innerHTML = `<center><img src='../Images/${tab[i]}.jpeg' width='85%' height='85%' alt='${tab_name[i]}'></center>`;
        tr1.appendChild(td0);

        let tr2 = document.createElement('tr');
        let th1 = document.createElement('th');
        th1.setAttribute('style','border: black solid 1px;');
        th1.innerHTML = "Prix : ";
        let td1 = document.createElement('td');
        td1.setAttribute('style','border: black solid 1px;');
        td1.innerHTML = stockInfo['05. price'];
        tr2.appendChild(th1);
        tr2.appendChild(td1);

        let tr3 = document.createElement('tr');
        let th2 = document.createElement('th');
        th2.setAttribute('style','border: black solid 1px;');
        th2.innerHTML ="Dernier jour d'échange : ";
        let td2 = document.createElement('td');
        td2.setAttribute('style','border: black solid 1px;');
        td2.innerHTML = stockInfo['07. latest trading day'];
        tr3.appendChild(th2);
        tr3.appendChild(td2);

        let tr4 = document.createElement('tr');
        let th3 = document.createElement('th');
        th3.setAttribute('style','border: black solid 1px;');
        th3.innerHTML = "Pourcentage d'échange : ";
        let td3 = document.createElement('td');

        if(stockInfo['10. change percent'].startsWith('-')) 
        {
            td3.innerHTML = `<img src='../Images/Red.jpeg' width='5%' height='5%' alt='↓'>    ${stockInfo['10. change percent']}`; 
            td3.setAttribute('style', 'color:red; border: black solid 1px;');
        }

        else
        {
            td3.innerHTML = `<img src='../Images/Green.jpeg' width='5%' height='5%' alt='↑'>    ${stockInfo['10. change percent']}`;
            td3.setAttribute('style', 'color:green; border:black solid 1px;');
        }

        tr4.appendChild(th3);
        tr4.appendChild(td3);

        table.appendChild(tr0);
        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        table.appendChild(tr4);
    
        field.appendChild(table);
    
        document.getElementById('side').appendChild(field);})

        .catch(error => {console.error('Error:', error);});
}

function start(tab)
{
    let field = document.createElement('fieldset');
    field.setAttribute('id', 'custom');
    field.setAttribute('style', 'border:none; width:40%; height:500px; float:left; padding-left:175px;padding-top:50px;');

    let set = document.createElement('fieldset');
    set.setAttribute('id', 'recherche');
    set.setAttribute('style', 'width:375px; height:175px; padding-left:10px;');

    let leg = document.createElement('legend');
    leg.innerText = 'Recherche';

    set.appendChild(leg);

    let lbl1 = document.createElement('label');
    lbl1.innerHTML = " Nom de l'entreprise : ";

    let inp = document.createElement('input');
    inp.setAttribute('type', 'text');
    inp.setAttribute('id', 'nom');

    set.appendChild(lbl1);
    set.appendChild(inp);
    set.appendChild(document.createElement('br'));
    set.appendChild(document.createElement('br'));

    let lbl2 = document.createElement('label');
    lbl2.innerHTML = " Lieu du poste : ";

    let inpt = document.createElement('input');
    inpt.setAttribute('type', 'text');
    inpt.setAttribute('id', 'lieu');

    set.appendChild(lbl2);
    set.appendChild(inpt);
    set.appendChild(document.createElement('br'));
    set.appendChild(document.createElement('br'));

    let btn = document.createElement('input');
    btn.setAttribute('type', 'button');
    btn.setAttribute('id', 'rech');
    btn.setAttribute('value', 'Rechercher');
    btn.setAttribute('onClick', 'rechercher()');

    set.appendChild(btn);

    field.appendChild(set);


    let fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', 'filtre');
    fieldset.setAttribute('style', "width:375px; height:200px; padding-left:10px;");

    let legend = document.createElement('legend');
    legend.innerText = 'Filtre';
    fieldset.appendChild(legend);
    
    let check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.setAttribute('id', 'cat');
    fieldset.appendChild(check);

    let checkCat = document.createTextNode(' Catégorie du poste');
    fieldset.appendChild(checkCat);
    
    fieldset.appendChild(document.createElement('br'));

    let cat = new Array();

    for(let i=0; i<tab.length; i++)
    {
        cat[i] = tab[i].categories[0].name;
    }
    cat = cat.sort();

    let selec = document.createElement('select');
    selec.setAttribute('id', 'category');
    let opti = document.createElement('option');
    opti.innerText = cat[0];
    selec.appendChild(opti);

    for(let i=0; i<cat.length-1; i++)
    {
        if(cat[i+1] != 'Unknown')
        {
            if(cat[i] != cat[i+1])
            {
                let opt = document.createElement('option');
                opt.innerText = cat[i+1];

                selec.appendChild(opt);
            }
        }
    }

    fieldset.appendChild(selec);
    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(document.createElement('br'));

    let box = document.createElement('input');
    box.setAttribute('type', 'checkbox');
    box.setAttribute('id', 'niv');
    fieldset.appendChild(box);

    let boxNiv = document.createTextNode(" Niveau d'expérience requis");
    fieldset.appendChild(boxNiv);
    
    fieldset.appendChild(document.createElement('br'));

    let niv = new Array();

    for(let i=0; i<tab.length; i++)
    {
        niv[i] = tab[i].levels[0].name;
    }
    niv = niv.sort();
    
    let select = document.createElement('select');
    select.setAttribute('id', 'niveau');
    let opt1 = document.createElement('option');
    opt1.innerText = niv[0];
    select.appendChild(opt1);

    for(let i=0; i<niv.length-1; i++)
    {
        if(niv[i] != niv[i+1])
        {
            let opt = document.createElement('option');
            opt.innerText = niv[i+1];

            select.appendChild(opt);
        }
    }

    fieldset.appendChild(select);
    
    fieldset.appendChild(document.createElement('br'));

    let btn1 = document.createElement('input');
    btn1.setAttribute('type', 'button');
    btn1.setAttribute('id', 'filt');
    btn1.setAttribute('value', 'Filtrer');
    btn1.setAttribute('onClick', 'filtrer(url)');

    
    let btn2 = document.createElement('input');
    btn2.setAttribute('type', 'button');
    btn2.setAttribute('id', 'annuFilt');
    btn2.setAttribute('value', 'Annuler le filtre');
    btn2.setAttribute('onClick', 'API(url)');
    btn2.setAttribute('disabled', '');

    let p = document.createElement("p");

    p.appendChild(btn1);
    btn1.insertAdjacentHTML('afterend', '&ensp;');
    p.appendChild(btn2);

    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(p);

    field.appendChild(fieldset);
    document.getElementById('side').appendChild(field);
        
    let para = document.createElement('p');
    para.setAttribute('id', 'order');
    para.setAttribute('style', 'float:left;');

    let img = document.createElement('img');
    img.setAttribute('style', 'width:5%; height:5%; margin-left:20px; border:0.25px black solid;');
    img.setAttribute('src', '../Images/up.png');
    img.setAttribute('alt', 'Up');
    img.setAttribute('id', 'tri');
    img.setAttribute('onClick', 'trierCroi()');
    para.appendChild(img);

    let txt = document.createTextNode(" Trier selon l'ordre alphabétique du nom de l’entreprise");
    para.appendChild(txt);

    field.appendChild(document.createElement('br'));
    field.appendChild(para);
}


async function API(url)
{
    document.getElementById('side').innerHTML = '';
    document.getElementById('main').innerHTML = '';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        let authors = data.results;
        console.log(authors);
        newTab = authors;

        start(authors);
        stonks();
        if(authors.length == 0)
        {
            document.getElementById('main').innerHTML = "<h1>Désolé! Pas d'offres disponibles!</h1><h3>Merci de rafraîchir la page. ☺ </h3>";
        }
        else
        {
            let i = 1;

            authors.forEach(elt => {

                let table = document.createElement("table");
    
                let caption = document.createElement('caption');
                caption.setAttribute('style', 'font-weight:bold; text-align:left;')
                caption.innerHTML = 'Offre N°' + i;
                table.appendChild(caption);
    
                let tr1 = document.createElement("tr");
                let tr2 = document.createElement("tr");
                let tr3 = document.createElement("tr");
                let tr4 = document.createElement("tr");
                let tr5 = document.createElement("tr");
                let tr6 = document.createElement("tr");
                let tr7 = document.createElement("tr");
    
                let nom = document.createElement("th");
                nom.innerHTML = "<strong>Nom de l'entreprise : </strong>";
                let name = document.createElement("td");
                name.innerText = elt.company.name;
                tr1.appendChild(nom);
                tr1.appendChild(name);
    
                let desc = document.createElement("th");
                desc.innerHTML = "<strong>Description du poste : </strong>";
                let description = document.createElement("td");
                description.innerText = elt.name;
                tr2.appendChild(desc);
                tr2.appendChild(description);
    
                let day = document.createElement("th");
                day.innerHTML = "<strong>Date de publication : </strong>";
                let date = document.createElement("td");
                date.innerText = elt.publication_date;
                tr3.appendChild(day);
                tr3.appendChild(date);
    
                let loc = document.createElement("th");
                loc.innerHTML = "<strong>Lieu du poste : </strong>";
                let lieu = document.createElement("td");
                lieu.innerText = elt.locations[0].name;
                tr4.appendChild(loc);
                tr4.appendChild(lieu);
    
                let cat = document.createElement("th");
                cat.innerHTML = '<strong>Catégorie du poste : </strong>'
                let category = document.createElement("td");
                category.innerText = elt.categories[0].name;
                tr5.appendChild(cat);
                tr5.appendChild(category);
    
                let lvl = document.createElement("th");
                lvl.innerHTML = "<strong>Niveau d'expérience requis : </strong>"
                let niv = document.createElement("td");
                niv.innerText = elt.levels[0].name;
                tr6.appendChild(lvl);
                tr6.appendChild(niv);
    
                let site = document.createElement("th");
                site.innerHTML = '<strong>Site web : </strong>'
                let web = document.createElement("td");
                web.innerHTML = '<a href=' + elt.refs.landing_page + '>' + elt.refs.landing_page + '</a>';
                tr7.appendChild(site);
                tr7.appendChild(web);
    
    
                table.appendChild(tr1);
                table.appendChild(tr2);
                table.appendChild(tr3);
                table.appendChild(tr4);
                table.appendChild(tr5);
                table.appendChild(tr6);
                table.appendChild(tr7);
    
                document.getElementById('main').appendChild(table);
                table.insertAdjacentHTML('afterend', '<br>');
                table.insertAdjacentHTML('afterend', '<hr>');
                table.insertAdjacentHTML('afterend', '<br>');
    
                i += 1;
    
            });

        }
    })
    .catch(error => console.log(error));
}

function rechercher()
{
    let name = document.getElementById('nom').value;
	let lieu = document.getElementById('lieu').value.split(' ').join('%20');
    let lien;

    if(name == '' && lieu == '')
    {
        alert('Vous devez remplir les champs de recherche!');
    }
    else if(name != '' && lieu == '')
    {
        lien = `https://www.themuse.com/api/public/jobs?company=${name}&page=1`;
    }
    else if(lieu != '' && name == '')
    {
        lien =  `https://www.themuse.com/api/public/jobs?location=${lieu}&page=1`;
    }
    else
    {
        lien = `https://www.themuse.com/api/public/jobs?location=${lieu}&company=${name}&page=1`;
    }

    document.getElementById('side').innerHTML = '';
    document.getElementById('main').innerHTML = '';
    console.log(lien);
    API(lien);
}


function filtrer()
{
    let tables = document.getElementById('main').querySelectorAll('table');
    let cat = document.getElementById('category').options;
    let niv = document.getElementById('niveau').options;

    let choixCat;
    let choixNiv;

    for(let i=0; i<cat.length; i++)
    {
        if(cat[i].selected)
        {
            choixCat = cat[i].innerText;
        }
    }

    for(let i=0; i<niv.length-1; i++)
    {
        if(niv[i].selected)
        {
            choixNiv = niv[i].innerText;
        }
    }

    let hrs = document.getElementById('main').getElementsByTagName('hr');
    let brs = document.getElementById('main').getElementsByTagName('br');

    while(hrs.length > 0 && brs.length > 0)
    {
        document.getElementById('main').removeChild(hrs[0]);
        document.getElementById('main').removeChild(brs[0]);
    }


    if(document.getElementById('niv').checked==false && document.getElementById('cat').checked==false)
    {
        alert("Vous devez choisir au moins un filtre!");
    }
    else
    {
        document.getElementById('annuFilt').disabled = false;
    
        for (let i=tables.length-1;i>=0; i--)
        {
            let table = tables[i];
      
            if(document.getElementById('cat').checked === true && document.getElementById('niv').checked === false)
            {
                if(table.childNodes[5].childNodes[1].innerText !== choixCat)
                {
                    table.parentNode.removeChild(table);
                }
            }
            else if(document.getElementById('niv').checked === true && document.getElementById('cat').checked === false)
            {
                if (table.childNodes[6].childNodes[1].innerText !== choixNiv)
                {
                    table.parentNode.removeChild(table);
                }
            }
            else if(document.getElementById('niv').checked === true && document.getElementById('cat').checked === true)
            {
                if(table.childNodes[5].childNodes[1].innerText !== choixCat && table.childNodes[6].childNodes[1].innerText !== choixNiv)
                {
                    table.parentNode.removeChild(table);
                }
            }
        }
    }
}

function trierCroi()
{
    let tab = newTab;

    for(let j=0; j<tab.length-1; j++)
    {
        for(let i=j+1; i<tab.length; i++)
        {
            if(tab[j].company.name > tab[i].company.name)
            {
                let tmp = tab[j];
                tab[j] = tab[i];
                tab[i] = tmp;
            }
        }
    }

    console.log(tab);

    document.getElementById('main').innerHTML = '';
    let i = 1;

    tab.forEach(elt => {

        let table = document.createElement("table");

        let caption = document.createElement('caption');
        caption.setAttribute('style', 'font-weight:bold; text-align:left;')
        caption.innerHTML = 'Offre N°' + i;
        table.appendChild(caption);

        let tr1 = document.createElement("tr");
        let tr2 = document.createElement("tr");
        let tr3 = document.createElement("tr");
        let tr4 = document.createElement("tr");
        let tr5 = document.createElement("tr");
        let tr6 = document.createElement("tr");
        let tr7 = document.createElement("tr");

        let nom = document.createElement("th");
        nom.innerHTML = "<strong>Nom de l'entreprise : </strong>";
        let name = document.createElement("td");
        name.innerText = elt.company.name;
        tr1.appendChild(nom);
        tr1.appendChild(name);

        let desc = document.createElement("th");
        desc.innerHTML = "<strong>Description du poste : </strong>";
        let description = document.createElement("td");
        description.innerText = elt.name;
        tr2.appendChild(desc);
        tr2.appendChild(description);

        let day = document.createElement("th");
        day.innerHTML = "<strong>Date de publication : </strong>";
        let date = document.createElement("td");
        date.innerText = elt.publication_date;
        tr3.appendChild(day);
        tr3.appendChild(date);

        let loc = document.createElement("th");
        loc.innerHTML = "<strong>Lieu du poste : </strong>";
        let lieu = document.createElement("td");
        lieu.innerText = elt.locations[0].name;
        tr4.appendChild(loc);
        tr4.appendChild(lieu);

        let cat = document.createElement("th");
        cat.innerHTML = '<strong>Catégorie du poste : </strong>'
        let category = document.createElement("td");
        category.innerText = elt.categories[0].name;
        tr5.appendChild(cat);
        tr5.appendChild(category);

        let lvl = document.createElement("th");
        lvl.innerHTML = "<strong>Niveau d'expérience requis : </strong>"
        let niv = document.createElement("td");
        niv.innerText = elt.levels[0].name;
        tr6.appendChild(lvl);
        tr6.appendChild(niv);

        let site = document.createElement("th");
        site.innerHTML = '<strong>Site web : </strong>'
        let web = document.createElement("td");
        web.innerHTML = '<a href=' + elt.refs.landing_page + '>' + elt.refs.landing_page + '</a>';
        tr7.appendChild(site);
        tr7.appendChild(web);


        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        table.appendChild(tr4);
        table.appendChild(tr5);
        table.appendChild(tr6);
        table.appendChild(tr7);

        document.getElementById('main').appendChild(table);
        table.insertAdjacentHTML('afterend', '<br>');
        table.insertAdjacentHTML('afterend', '<hr>');
        table.insertAdjacentHTML('afterend', '<br>');

        i += 1;
    });

    document.getElementById('tri').setAttribute('src', '../Images/down.png');
    document.getElementById('tri').setAttribute('onClick', 'trierDecroi()');
}

function trierDecroi()
{
    let tab = newTab;

    for(let j=0; j<tab.length-1; j++)
    {
        for(let i=j+1; i<tab.length; i++)
        {
            if(tab[j].company.name < tab[i].company.name)
            {
                let tmp = tab[j];
                tab[j] = tab[i];
                tab[i] = tmp;
            }
        }
    }

    console.log(tab);

    document.getElementById('main').innerHTML = '';
    let i = 1;

    tab.forEach(elt => {

        let table = document.createElement("table");

        let caption = document.createElement('caption');
        caption.setAttribute('style', 'font-weight:bold; text-align:left;')
        caption.innerHTML = 'Offre N°' + i;
        table.appendChild(caption);

        let tr1 = document.createElement("tr");
        let tr2 = document.createElement("tr");
        let tr3 = document.createElement("tr");
        let tr4 = document.createElement("tr");
        let tr5 = document.createElement("tr");
        let tr6 = document.createElement("tr");
        let tr7 = document.createElement("tr");

        let nom = document.createElement("th");
        nom.innerHTML = "<strong>Nom de l'entreprise : </strong>";
        let name = document.createElement("td");
        name.innerText = elt.company.name;
        tr1.appendChild(nom);
        tr1.appendChild(name);

        let desc = document.createElement("th");
        desc.innerHTML = "<strong>Description du poste : </strong>";
        let description = document.createElement("td");
        description.innerText = elt.name;
        tr2.appendChild(desc);
        tr2.appendChild(description);

        let day = document.createElement("th");
        day.innerHTML = "<strong>Date de publication : </strong>";
        let date = document.createElement("td");
        date.innerText = elt.publication_date;
        tr3.appendChild(day);
        tr3.appendChild(date);

        let loc = document.createElement("th");
        loc.innerHTML = "<strong>Lieu du poste : </strong>";
        let lieu = document.createElement("td");
        lieu.innerText = elt.locations[0].name;
        tr4.appendChild(loc);
        tr4.appendChild(lieu);

        let cat = document.createElement("th");
        cat.innerHTML = '<strong>Catégorie du poste : </strong>'
        let category = document.createElement("td");
        category.innerText = elt.categories[0].name;
        tr5.appendChild(cat);
        tr5.appendChild(category);

        let lvl = document.createElement("th");
        lvl.innerHTML = "<strong>Niveau d'expérience requis : </strong>"
        let niv = document.createElement("td");
        niv.innerText = elt.levels[0].name;
        tr6.appendChild(lvl);
        tr6.appendChild(niv);

        let site = document.createElement("th");
        site.innerHTML = '<strong>Site web : </strong>'
        let web = document.createElement("td");
        web.innerHTML = '<a href=' + elt.refs.landing_page + '>' + elt.refs.landing_page + '</a>';
        tr7.appendChild(site);
        tr7.appendChild(web);


        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        table.appendChild(tr4);
        table.appendChild(tr5);
        table.appendChild(tr6);
        table.appendChild(tr7);

        document.getElementById('main').appendChild(table);
        table.insertAdjacentHTML('afterend', '<br>');
        table.insertAdjacentHTML('afterend', '<hr>');
        table.insertAdjacentHTML('afterend', '<br>');

        i += 1;
    });

    document.getElementById('tri').setAttribute('src', '../Images/up.png');
    document.getElementById('tri').setAttribute('onClick', 'trierCroi()');
}