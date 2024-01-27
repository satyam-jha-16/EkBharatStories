import React from 'react'
import {Footer} from 'flowbite-react'
import weblogo from '../assets/LOGO-EBSB.png'
import {BsInstagram, BsTwitter, BsLinkedin, BsGithub} from 'react-icons/bs'
function FooterComp() {
  return (
    <Footer container className="border-t-8 border-teal-400 mt-32">
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-2 '>
          <div className='mt-5 flex'>
          <a
                href="https://sites.google.com/view/ggsipuedc/home"
                target="_blank"
                className="flex items-center "
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/GGSIU_logo.svg/640px-GGSIU_logo.svg.png"
                  className="mr-3 h-32 md:h-48"
                  alt="Logo"
                />
            </a>
            <a
                href="https://ebsb-website.vercel.app"
                target="_blank"
                className='inline'              
                >
                <img
                  src={weblogo}
                  className="mr-3 h-32 md:h-48 inline"
                  alt="Logo"
                />
          
              </a>
            </div>
            <div className='grid grid-cols-2 gap-3 mt-4 sm:flex sm:ml-auto'>
              <div>
              <Footer.Title title='QuickLinks' className='text-xl' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://ebsb-website.vercel.app' 
                target='_blank'
                className="text-xl"
                >
                  About EBSB GGSIPU
                </Footer.Link>
                <Footer.Link 
                href='https://ekbharat.gov.in/' 
                target='_blank'
                className="text-xl"
                >
                  About Ek Bharat Mission
                </Footer.Link>
                <Footer.Link href='https://sites.google.com/view/ggsipuedc/home' target='_blank' className="text-xl">GGSIPU -EDC</Footer.Link>
                <Footer.Link href='http://www.ipu.ac.in/' target='_blank'
                className="text-xl">GGSIPU -Dwarka</Footer.Link>
              </Footer.LinkGroup>

              </div>
              <div>
              <Footer.Title title='Follow us' className='text-xl'/>
              <Footer.LinkGroup col>
                <Footer.Link href="https://twitter.com/EBSB_EDC" 
                target='_blank'
                className="text-xl"
                >
                  TWITTER
                </Footer.Link>
                <Footer.Link 
                href="https://twitter.com/EBSB_EDC"
                target='_blank'
                className="text-xl"
                >
                  INSTAGRAM
                </Footer.Link>
                <Footer.Link 
                href="https://www.linkedin.com/company/ek-bharat-shreshtha-bharat-ggsipu-edc/"
                target='_blank'
                className="text-xl"
                >
                  LINKEDIN
                </Footer.Link>
                <Footer.Link href="https://github.com/satyam-jha-16/EkBharatStories" 
                target='_blank'
                className="text-xl"
                >GITHUB</Footer.Link>
              </Footer.LinkGroup>

              </div>
              
              

            </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='https://github.com/satyam-jha-16/EkBharatStories' by='Designed and maintained by Satyam Jha' year={new Date().getFullYear()} />
          <div className='flex gap-6 mt-4 sm:mt-0 sm:justify-center'>
            <Footer.Icon href='https://twitter.com/EBSB_EDC' icon={BsInstagram} />
            <Footer.Icon href='https://twitter.com/EBSB_EDC' icon={BsTwitter} />
            <Footer.Icon href='https://www.linkedin.com/company/ek-bharat-shreshtha-bharat-ggsipu-edc/' icon={BsLinkedin} />
            <Footer.Icon href='https://github.com/satyam-jha-16/EkBharatStories' icon={BsGithub} />
          </div>
        </div>
      </div>

    </Footer>
  )
}

export default FooterComp