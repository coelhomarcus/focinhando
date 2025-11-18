import Hero from './Sections/Hero'
import Mission from './Sections/Mission'
import Features from './Sections/Features'
import Stats from './Sections/Stats'
import Team from './Sections/Team'
import CTA from './Sections/CTA'

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
