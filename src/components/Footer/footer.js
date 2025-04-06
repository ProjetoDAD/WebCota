import React from "react"
import twitter from '../../assets/Twitter.svg'
import facebook from '../../assets/facebook.svg'
import linkedin from '../../assets/linkedin.svg'
import logo_preta from '../../assets/logo_preta.svg'

function Footer(){
    return  <footer>
              <div class="footer-content">
                <div class="footer-column">
                  <h3>NAVEGAÇÃO</h3>
                  <ul>
                    <li>About Us</li>
                    <li>What We Do</li>
                    <li>Home</li>
                    <li>To The Power of 10</li>
                    <li>Donate</li>
                  </ul>
                </div>
                <div class="footer-column">
                  <h3>O QUE NÓS FAZEMOS</h3>
                  <ul>
                    <li>Encouraging Testing</li>
                    <li>Strengthening Advocacy</li>
                    <li>Sharing Information</li>
                    <li>Building Leadership</li>
                    <li>Engaging With Global Fund</li>
                    <li>Shining a Light</li>
                  </ul>
                </div>
                <div class="footer-column">
                  <h3>LEGALIDADE</h3>
                  <ul>
                    <li>General Info</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                  </ul>
                </div>
                <div class="footer-column">
                  <h3>FALE CONOSCO</h3>
                  <ul>
                    <li>projetoDAD99@gmail.com</li>
                    <li>+11 4002-8922</li>
                    <li>Nós contacte</li>
                    <li>Suporte</li>
                    <li>LinkedIn</li>
                    <li>Twitter</li>
                  </ul>
                </div>
              </div>
              <div class="footer-bottom">
                <div class="logo">
                  <img class="imagem-contatos" src={logo_preta} alt="WebCota"/>
                  
                </div>
                <p>© 2025 WebCota Media. All Rights Reserved.</p>
                <div class="social-icons">
                    <a href="#"><img class="imagem-contatos" src={facebook} alt="Facebook"/></a>
                    <a href="#"><img class="imagem-contatos" src={linkedin} alt="LinkedIn"/></a>
                    <a href="#"><img class="imagem-contatos" src={twitter}  alt="Twitter"/></a>
                </div>
              </div>
            </footer>
  }

export default Footer;