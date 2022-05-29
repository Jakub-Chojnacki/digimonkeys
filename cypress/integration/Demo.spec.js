
const demoYt = [{type:'YOUTUBE',id:'IHLLYeFc5sg',addedAt:'25th May 2022',isFav:false},{type:'YOUTUBE',id:'NIq3qLaHCIs',addedAt:'25th May 2022',isFav:true},{type:'YOUTUBE',id:'TE66McLMMEw',addedAt:'25th May 2022',isFav:false},{type:'YOUTUBE',id:'Mus_vwhTCq0',addedAt:'27th May 2022',isFav:true},{type:'YOUTUBE',id:'KCrXgy8qtjM',addedAt:'28th May 2022',isFav:true},{type:'YOUTUBE',id:'3znAl0QH1eE',addedAt:'28th May 2022',isFav:true}];
const demoVimeo = [{type:'VIMEO',id:'710119524',addedAt:'25th May 2022',isFav:true},{type:'VIMEO',id:'705396134',addedAt:'25th May 2022',isFav:false},{type:'VIMEO',id:'712760573',addedAt:'25th May 2022',isFav:false},{type:'VIMEO',id:'181696349',addedAt:'25th May 2022',isFav:false},{type:'VIMEO',id:'267520931',addedAt:'27th May 2022',isFav:false}];

describe("Load demos and perform actions", ()=>{
    it("Can load demos", ()=>{
        cy.visit("http://localhost:3000/#");
        cy.get('button').contains("Load Demo Videos").click()
        cy.wait(1000)
      
        cy.get('h5').contains('YouTube Data API v3 Tutorial')
        cy.wait(2000) // wait for vimeo api
        cy.get('h5').contains('I CARRY THEM')
    })

    it("Can change posts per page", ()=> {
        cy.get('button').contains("Posts per page").click()
        cy.get('button[value="4"]').contains("4").click()
        cy.get('h5').contains('Vite in 100 Seconds').should('not.exist')
    })
    it("Can change page", ()=> {
        cy.get('a').contains("2").click()
        cy.contains('Vite in 100 Seconds')
    })

    it("Can show only favourite videos", ()=> {
        cy.get('button').contains("Show Favourite Videos").click()
        cy.contains('일할 때 가장 좋은 것은 이 노래를 듣는 것 | 3 hour lofi hiphop mix / lofi study / work / beats to relax').should('not.exist')
        cy.contains('YouTube Data API v3 Tutorial').should('not.exist')
        cy.contains('Vite in 100 Seconds')
        cy.setLocalStorage('ytVideos', JSON.stringify(demoYt))
        cy.setLocalStorage('vimeoVideos', JSON.stringify(demoVimeo))
        cy.get('svg[data-test-name="fav"]').first().click()
        cy.contains('Why Is Array/Object Destructuring So Useful And How To Use It').should('not.exist')
        
    })

    it("Can go back to all videos", ()=> {
        cy.get('button').contains("Show All Videos").click()
        cy.get('a').contains("1").click()
        cy.contains('YouTube Data API v3 Tutorial')
        
    })

    it("Can sort by oldest", ()=> {
        cy.get('button').contains("Sort by oldest").click()
        cy.contains('Vite in 100 Seconds')
        cy.contains('일할 때 가장 좋은 것은 이 노래를 듣는 것 | 3 hour lofi hiphop mix / lofi study / work / beats to relax').should('not.exist')
    })

    it("Can go back to sorting by newest", ()=> {
        cy.get('button').contains("Sort by newest").click()
        cy.contains('Vite in 100 Seconds').should('not.exist')
        cy.contains('일할 때 가장 좋은 것은 이 노래를 듣는 것 | 3 hour lofi hiphop mix / lofi study / work / beats to relax')
    })

    it("Can open and close a video", ()=> {
        cy.get('svg[data-test-name="watch"]').first().click()
        cy.get('iframe')
        cy.get('svg[data-test-name="close_modal"]').click()

    })

    it("Can remove a single video", ()=> {
        cy.setLocalStorage('ytVideos', JSON.stringify(demoYt))
        cy.setLocalStorage('vimeoVideos', JSON.stringify(demoVimeo))
        cy.get('svg[data-test-name="delete"]').first().click()
        cy.contains('일할 때 가장 좋은 것은 이 노래를 듣는 것 | 3 hour lofi hiphop mix / lofi study / work / beats to relax').should('not.exist')
    })

   

    
})



