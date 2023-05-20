function signout()
{
    window.location.href = "Index.html";
}

function haut(elem)
{
    let par = elem.parentNode;

    for(let i=0; i<par.querySelectorAll('label').length; i++)
    {
        par.querySelectorAll('label')[i].childNodes[3].disabled = false;
        par.querySelectorAll('label')[i].childNodes[5].disabled = false;
    }

    par.insertBefore(elem, elem.previousElementSibling);

    par.firstElementChild.childNodes[3].disabled = true;
    par.lastElementChild.childNodes[5].disabled = true;
}

function bas(elem)
{
    let par = elem.parentNode;
    
    for(let i=0; i<par.querySelectorAll('label').length; i++)
    {
        par.querySelectorAll('label')[i].childNodes[3].disabled = false;
        par.querySelectorAll('label')[i].childNodes[5].disabled = false;
    }

    par.insertBefore(elem.nextElementSibling, elem);

    par.firstElementChild.childNodes[3].disabled = true;
    par.lastElementChild.childNodes[5].disabled = true;
}

function ajouterrbad(elem)
{
    let doc = elem.parentNode;

    let lbl = document.createElement("label");
    let npt1 = document.createElement("input");
    let npt2 = document.createElement("input");
    let npt3 = document.createElement("input");
    let npt4 = document.createElement("input");
    let txt = document.createTextNode(' : ');

    lbl.setAttribute("id", elem.value);

    lbl.appendChild(elem);
    lbl.appendChild(txt);

    npt1.setAttribute("type", "text");
    
    npt2.setAttribute("type", "button");
    npt2.setAttribute("value", "Haut");
    npt2.setAttribute("onClick", "haut(document.getElementById('" + elem.value + "'))");

    npt3.setAttribute("type", "button");
    npt3.setAttribute("value", "Bas");
    npt3.setAttribute("onClick", "bas(document.getElementById('" + elem.value + "'))");

    npt4.setAttribute("type", "button");
    npt4.setAttribute("value", "Supprimer");
    npt4.setAttribute("onClick", "supprimer(document.getElementById('" + elem.value + "'))");

    lbl.appendChild(npt1);
    lbl.appendChild(npt2);
    lbl.appendChild(npt3);
    lbl.appendChild(npt4);
    lbl.appendChild(document.createElement('br'));
    lbl.appendChild(document.createElement('br'));

    if(doc.getAttribute('id') == 'mef')
    {
        doc.insertBefore(lbl, document.getElementById("nb"));
        doc.style.height = '275px';
    }
    else
    {
        doc.appendChild(lbl);
    }

    elem.disabled = true;
}

function ajouter()
{
    if(document.getElementById('aj').value != '')
    {
        let ajbtn = document.createElement('input');
        ajbtn.setAttribute('type', 'button');
        ajbtn.setAttribute('id', 'btn');
        ajbtn.setAttribute('value', document.getElementById('aj').value);
        ajbtn.setAttribute('onClick', 'ajouterrbad(this)');
        document.body.childNodes[5].childNodes[5].appendChild(ajbtn);

        ajouterrbad(ajbtn);
    }
    else
    {
        alert("Vous devez remplir le titre du champ d'abord!");
    }
}

function supprimer(elem)
{
    let btn = elem.childNodes[0]
    btn.disabled = false;
    elem.parentNode.insertBefore(btn, elem.parentNode.childNodes[5]);
    btn.insertAdjacentHTML('beforebegin', '&ensp;');
    btn.insertAdjacentHTML('afterend', '&ensp;');

    elem.parentNode.removeChild(elem);
}

function mef(elem)
{
    let st = document.body.childNodes[5].childNodes[9].querySelectorAll("label");
    let cf;
    let cp;
    let tp;

    for(let i=0; i<st.length; i++)
    {
        if(st[i].attributes[0].value == 'Couleur du fond')
        {
            cf = st[i].childNodes[2].value;
        }
        else if(st[i].attributes[0].value == 'Couleur de la police')
        {
            cp = st[i].childNodes[2].value;
        }
        else if(st[i].attributes[0].value == 'Taille de la police')
        {
            tp = Number(st[i].childNodes[2].value);
        }
    }
    if(document.getElementById('gras').checked)
    {
        elem.setAttribute('style', 'font-weight:bold; background:' + cf + '; color:' + cp + '; font-size:' + tp +'px');
    }
    else
    {
        elem.setAttribute('style', 'background:' + cf + '; color:' + cp + '; font-size:' + tp +'px');
    }
}

function apercu()
{
    if(document.getElementById('id').childNodes[1].value == '' || document.getElementById('bday').childNodes[1].value == '' || document.getElementById('num').childNodes[1].value == '' || document.getElementById('mail').childNodes[1].value == '' || document.getElementById('add').childNodes[1].value == '')
    {
        alert("Les entrées de la rubriques 'Données Personnelles' doivent être remplies intégralement!")
    }
    else
    {
        let frm = document.body.childNodes[5].childNodes[1].childNodes[5].querySelectorAll("label");
        let rbad = document.body.childNodes[5].childNodes[5].querySelectorAll("label");

        let fld = document.createElement('fieldset');
        let lgd = document.createElement('legend');
        let cv = document.createTextNode("Curriculum Vitae");

        lgd.appendChild(cv);
        fld.appendChild(lgd);

        let tbl = document.createElement('table');
        tbl.setAttribute('style', 'float:left;');
    
        for(let i=0; i<frm.length; i++)
        {
            let elem = document.createTextNode(frm[i].innerText);
            let thh = document.createElement('th');
            let trr = document.createElement('tr');
            let tdd = document.createElement('td');
            let donnee = frm[i].childNodes[1].value;

            thh.appendChild(elem);
            trr.appendChild(thh);
            tdd.append(donnee);
            trr.appendChild(tdd);  
            tbl.appendChild(trr);
        }

        for(let i=0; i<rbad.length; i++)
        {
            let eleme = document.createTextNode(rbad[i].attributes[0].value + ' : ');
            let trrr = document.createElement('tr');
            let thhh = document.createElement('th');
            let tddd = document.createElement('td');
            let donnee = rbad[i].childNodes[2].value;

            thhh.appendChild(eleme);
            trrr.appendChild(thhh);
            tddd.append(donnee);
            trrr.appendChild(tddd);  
            tbl.appendChild(trrr);
        }

        let img = document.createElement('img');
        img.setAttribute('src', '../Images/pp.png');
        img.setAttribute('style', 'width:25%; height:50%; float:right;');
        img.setAttribute('alt', 'Profile Picture')

        fld.appendChild(document.createElement('br'));
        fld.appendChild(tbl);
        fld.appendChild(img);
        
        document.body.childNodes[5].appendChild(fld);
        fld.setAttribute('id', 'fld');
        fld.setAttribute('style', 'text-align:left;')

        mef(document.getElementById('fld'));

        document.getElementById('ap').disabled = true;
        document.getElementById('soum').disabled = false;
    }
}

function envoyer()
{
    alert("Votre CV a été soumis!");

    document.body.childNodes[5].removeChild(document.getElementById('fld'));
    document.getElementById('ap').disabled = false;
    document.getElementById('soum').disabled = true;

    let dp = document.body.childNodes[5].childNodes[1].querySelectorAll('label');
    let rbad = document.body.childNodes[5].childNodes[5].querySelectorAll('label');
    let mef = document.body.childNodes[5].childNodes[9].querySelectorAll('label');

    for(let i=0; i<dp.length; i++)
    {
        for(let j=0; j<dp[i].childElementCount-3; j++)
        {
            dp[i].childNodes[j].value = "";
        }
    }

    for(let i=0; i<rbad.length; i++)
    {
        supprimer(rbad[i]);
    }

    for(let i=0; i<mef.length; i++)
    {
        supprimer(mef[i]);
    }

    document.getElementById('gras').checked = false;   
}