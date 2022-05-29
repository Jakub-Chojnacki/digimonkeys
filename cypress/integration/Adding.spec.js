
describe("Adding videos and clearing all", ()=>{
    it("can input a youtube link", ()=>{
        cy.visit("http://localhost:3000/#");
        cy.get('input')
        cy.get('input[placeholder="Input a youtube video link/id"]').type('https://www.youtube.com/watch?v=GznmPACXBlY')
        cy.get('button[type="submit"]').first().click({force:true})
        cy.wait(1000)
        cy.get('h5').contains('How I built a software agency website with Next.js + Tailwind CSS (in nature)')
    })

    it("can add a vimeo video from a link", ()=>{
        cy.get('button').contains('VIMEO').click()
        cy.get('input[placeholder="Input a vimeo video link/id"]').type('https://vimeo.com/710119524')
        cy.get('button[type="submit"]').first().click({force:true})
        cy.wait(2000) //vimeo API can be slow at times
        cy.get('h5').contains('The Art of Work')
    })

    it("can input a youtube id", ()=>{
        cy.get('button').contains('YOUTUBE').click()
        cy.get('input')
        cy.get('input[placeholder="Input a youtube video link/id"]').type('TE66McLMMEw')
        cy.get('button[type="submit"]').first().click({force:true})
        cy.wait(1000)
        cy.get('h5').contains('YouTube Data API v3 Tutorial')
    })

    it("can add a vimeo video from id", ()=>{
        cy.get('button').contains('VIMEO').click()
        cy.get('input[placeholder="Input a vimeo video link/id"]').type('712599017')
        cy.get('button[type="submit"]').first().click({force:true})
        cy.wait(2000) //vimeo API can be slow at times
        cy.get('h5').contains('Freelancer Yoga')
    })

    it("clear all videos", ()=>{
        cy.get('button[class="btn btn-danger"]').each((el) => {el.click()})
        cy.contains('The Art of Work').should('not.exist')
        cy.contains('YouTube Data API v3 Tutorial').should('not.exist')
       
    })
})



