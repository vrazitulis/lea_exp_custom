PennController.ResetPrefix(null); // Shorten command names (keep this line here))

Header(
// void
)

DebugOff()   // Uncomment this line only when you are 100% done designing your experiment

//custom function

function SepWithN(sep, main, n) {
    this.args = [sep,main];

    this.run = function(arrays) {
        assert(arrays.length == 2, "Wrong number of arguments (or bad argument) to SepWithN");
        assert(parseInt(n) > 0, "N must be a positive number");
        let sep = arrays[0];
        let main = arrays[1];

        if (main.length <= 1)
            return main
        else {
            let newArray = [];
            while (main.length){
                for (let i = 0; i < n && main.length>0; i++)
                    newArray.push(main.shift());
                for (let j = 0; j < sep.length; ++j)
                    newArray.push(sep[j]);
            }
            return newArray;
        }
    }
}
function sepWithN(sep, main, n) { return new SepWithN(sep, main, n); }


// First show instructions, then experiment trials, send results and show end screen

Sequence("counter", "consent","questionnaire", "instructions1", "instructions2", "instructions3" , "practice","transition", sepWithN("break", randomize("experimental-trial"), 18), "send", "confirmation-prolific")
SetCounter("counter", "inc", 1);

// This message is shown to everyone with a screen resolution under 1280px
newTrial("ScreenSizeChecker",
    newFunction( ()=>window.matchMedia("only screen and (max-width: 899px)").matches )
        .test.is(true)
        .success(
            newText("<p>Malheureusement, la résolution de votre dispositif est trop basse.</p>"+
                    "<p>Essayez de changer de résolution ou utilisez un autre appareil.</p>")
                .print()
            ,
            newButton().wait()
        )
);

// Fullscreen from beginning on
PennController("Fullscreen",
  newHtml("fullscreen", "fullscreen.html")
  .print(),
  newButton("Plein écran")
    .css("font-size", "medium")
    .center()
    .print()
    .wait()
    ,
    fullscreen()
);


// Consent form
newTrial("consent",
    newHtml("consent_form", "consent.html")
        .cssContainer({"width":"700px"})
        .checkboxWarning("Vous devez approuver avant de continuer.")
        .print()
    ,
    newButton("continue", "Continuer")
        .center()
        .css("font-size", "medium")
        .print()
        .wait(getHtml("consent_form").test.complete()
                  .failure(getHtml("consent_form").warn())
        )
)

// Instructions
newTrial("instructions1",
     // Automatically print all Text elements, centered
    defaultText.center().print()
    ,
    newHtml("instructions1", "instr.html")
        .cssContainer({"width":"700px"})
        .print()
    ,
    newButton("continue", "Continuer")
        .center()
        .css("font-size", "medium")
        .print()
        .wait()
)

newTrial("instructions2",
     // Automatically print all Text elements, centered
    defaultText.center().print()
    ,
    newHtml("instructions2", "instr2.html")
        .cssContainer({"width":"700px"})
        .print()
    ,
    newButton("continue", "Continuer")
        .center()
        .css("font-size", "medium")
        .print()
        .wait()
)

newTrial("instructions3",
     // Automatically print all Text elements, centered
    defaultText.center().print()
    ,
    newHtml("instructions3", "instr3.html")
        .cssContainer({"width":"700px"})
        .print()
    ,
    newButton("continue", "Continuer")
        .center()
        .css("font-size", "medium")
        .print()
        .wait()
)

newTrial("questionnaire",
    newController("Question", {
            q: "Êtes-vous de langue maternelle française ?",
            as: ["Oui", "Non"],
            hasCorrect: true,
            randomOrder: false})
        .center()
        .print()
        .log()
        .wait()
        .remove()
)


newTrial("questionnaire",
    newText("age_question", "Indiquez s'il vous plaît votre âge :")
        .center()
        .print()
    ,

    newTextInput("age_response", "")
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        .print()
    ,
    
    newButton("Confirmer")
        .center()
        .print()
        // Only validate a click on Confirmer when age_response is filled
        .wait( getTextInput("age_response").testNot.text("") )
    ,
    
    getTextInput("age_response")
        .log()
)

 newTrial("practice",
         newHtml("context1", "context1.html")
        .cssContainer({"width":"700px"})
        .center()
        .print()
        ,
        
        newKey("space", " ")
        .wait()
        ,

        getHtml("context1")
        .remove()
        ,
        
        getKey("space")
        .remove()
        ,
        
        newTimer("wait", 1)
        .start()
        .wait()
        ,
        
        getTimer("wait")
        .remove()
        ,
        newController("DashedSentence", {s : "Longtemps, je_me_suis couché de_bonne_heure"})
        .size(900, 400)
        .center()
        .print()
        .log()
        .wait()
        .remove()
        ,
        
        newHtml("context2", "context2.html")
        .cssContainer({"width":"700px"})
        .center()
        .print()
        ,
        
        newKey("space", " ")
        .wait()
        ,

        getHtml("context2")
        .remove()
        ,
        
        getKey("space")
        .remove()
        ,
        
        newTimer("wait", 1)
        .start()
        .wait()
        ,
        
        getTimer("wait")
        .remove()
    ,
     newController("DashedSentence", {s : "Toutes_les_familles_heureuses se_ressemblent, mais chaque_famille_malheureuse l'est à_sa_façon"})
        .size(900, 400)
        .center()
        .print()
        .log()
        .wait()
        .remove()
        ,
    
        newHtml("context3", "context3.html")
        .cssContainer({"width":"700px"})
        .center()
        .print()
        ,
        
        newKey("space", " ")
        .wait()
        ,

        getHtml("context3")
        .remove()
        ,
        
        getKey("space")
        .remove()
        ,
        
        newTimer("wait", 1)
        .start()
        .wait()
        ,
        
        getTimer("wait")
        .remove()
    ,
     newController("DashedSentence", {s : "Alice, assise_auprès_de_sa_soeur sur_le_gazon, commençait_à_s'ennuyer de_rester_là à_ne_rien_faire"})
        .size(900, 400)
        .center()
        .print()
        .log()
        .wait()
        .remove()
    ,
    
    newController("Question", {
            instructions: "Utilisez les touches numérotées ou cliquez sur la bonne réponse.",
            q:  "Alice était-elle assise ?",
            as: ["Oui", "Non"].sort(v=>0.5-Math.random()).concat(["Je ne sais pas"]),
            hasCorrect: true,
            randomOrder: false})
        .center()
        .print()
        .log()
        .wait()
        .remove()
        

    )

// Transition
    newTrial("transition",
     // Automatically print all Text elements, centered
    defaultText.center().print()
    ,
    newHtml("transition", "transition.html")
        .cssContainer({"width":"700px"})
        .print()
    ,
    newButton("continue", "Continuer")
        .center()
        .css("font-size", "medium")
        .print()
        .wait()
)

newTrial("break",
     // Automatically print all Text elements, centered
    newText("pleasewait", "<span style='font-size:20px;'>Faites une pause!</span>")
    .print()
    .center()
    ,
    newTimer("wait", 10000)
    .start()
    .wait()
    ,
    getText("pleasewait")
    .remove()
    ,
    newText("resume", "<span style='font-size:20px;'>Vous pouvez continuer l'expérience. Cliquez sur Continuer pour reprendre. <br> <br></span>")
    .print()
    .center()
    ,
    newButton("continue", "Continuer")
        .center()
        .css("font-size", "medium")
        .print()
        .wait()
)


// Experimental trial
Template("items.csv", row =>
    newTrial("experimental-trial",
    
        newHtml("context", row.context)
        .cssContainer({"width":"700px"})
        .center()
        .print()
        ,
        
        newKey("space", " ")
        .wait()
        ,

        getHtml("context")
        .remove()
        ,
        
        getKey("space")
        .remove()
        ,
        
        newTimer("wait", 1)
        .start()
        .wait()
        ,
        
        getTimer("wait")
        .remove()
        ,
        
        newController("DashedSentence", {s : row.sentence})
        .size(900, 400)
        .center()
        .print()
        .log()
        .wait()
        .remove()
        ,
        
        row.question.trim() !== "" ?
        newController("Question", {
            instructions: "Utilisez les touches numérotées ou cliquez sur la bonne réponse.",
            q: row.question,
            as: [row.correct, row.wrong].sort(v => 0.5 - Math.random()).concat([row.answer]),
            hasCorrect: true,
            randomOrder: false
        })
        .center()
        .print()
        .log()
        .wait()
        .remove():
        
        newButton("continue", "Continuer")
        .center()
        .css("font-size", "medium")
        .print()
        .wait()
        
    )
    .log("item", row.item)
    .log("NP_size", row.NP_size)
    .log("condition", row.condition)
    .log("is_filler", row.is_filler)
    .log("list", row.list) // Latin-square list; added by Michael (May 10)
    .log("correct", row.correct) // correct answer; added by Michael (May 10)
    
);



// Send results manually
SendResults("send")

// Completion screen
newTrial("confirmation-prolific" ,
    newText("<p>Merci de votre participation!</p>")
        .center()
        .print()
    ,

    newButton("void")
    .wait()
    ).setOption("countsForProgressBar",false)
