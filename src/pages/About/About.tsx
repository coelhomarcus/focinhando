import Hero from './Sections/AboutHero'
import Mission from './Sections/AboutMission'
import Features from './Sections/AboutFeatures'
import Stats from './Sections/AboutStats'
import Team from './Sections/AboutTeam'
import CTA from './Sections/AboutCTA'

const About = () => {
   return (
      <div className='min-h-screen bg-white'>
         <Hero />
         <Mission />
         <Features />
         <Stats />
         <Team />
         <CTA />
      </div>
   )
}

export default About
