import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Banknote, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2,
  Send,
  Image as ImageIcon,
  Paperclip,
  Bot,
  MapPin,
  Star,
  ArrowRight,
  Loader2
} from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Currency from '../../components/Currency'; 

// --- Styled Components ---

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fb;
`;

const Content = styled.main`
  flex: 1;
  padding: 10rem 1.25rem 6rem 1.25rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  @media (min-width: 768px) { padding: 12rem 2rem 6rem 2rem; }
`;

const Header = styled.div`
  margin-bottom: 3rem;
  max-width: 800px;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 5vw, 4.5rem);
    color: #00658d;
    line-height: 1.1;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }
  
  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.2rem;
    color: #3e4850;
    line-height: 1.6;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 1fr;
    align-items: start;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid #e0e3e5;
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon-box {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: #e1f2ff;
    color: #00658d;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    color: #3e4850;
    margin: 0 0 0.25rem 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: #191c1e;
    margin: 0;
  }
`;

const SectionBox = styled.div`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: 1px solid #e0e3e5;

  h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.5rem;
    color: #191c1e;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

const TypesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const TypeItem = styled.div`
  background: #f7f9fb;
  padding: 1.5rem;
  border-radius: 1rem;
  border-left: 4px solid #00658d;

  h4 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #00658d;
    margin: 0 0 0.5rem 0;
  }

  p {
    font-family: 'Hanken Grotesk', sans-serif;
    color: #3e4850;
    margin: 0 0 0.5rem 0;
    line-height: 1.5;
  }

  .target {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ff5722;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.05rem;
    color: #3e4850;
    line-height: 1.5;
  }
`;

const LocationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e3e5;

  .loc-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #00658d;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 600;
  }

  .change-btn {
    background: none;
    border: none;
    color: #ff5722;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
`;

const ClinicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClinicCard = styled.div`
  background: #f7f9fb;
  border: 1px solid #e0e3e5;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 101, 141, 0.05);
    border-color: #26b1ff;
  }

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .clinic-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h4 {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #191c1e;
      margin: 0;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 0.9rem;
      color: #3e4850;

      .rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #f59e0b;
        font-weight: 600;
      }
    }
  }

  .clinic-action {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    
    @media (min-width: 640px) { align-items: flex-end; }

    .price {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.8rem;
      color: #00658d;
      margin: 0;
      line-height: 1;
    }

    button {
      padding: 0.5rem 1rem;
      background: #ff5722;
      color: white;
      border: none;
      border-radius: 9999px;
      font-family: 'Hanken Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background 0.2s;

      &:hover { background: #f4511e; }
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ProductCard = styled.div`
  background: #f7f9fb;
  border: 1px solid #e0e3e5;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;

  h5 { font-family: 'Hanken Grotesk', sans-serif; font-size: 1rem; margin: 0.5rem 0; color: #191c1e; }
  p { font-size: 0.85rem; color: #8fa3b0; margin-bottom: 0.5rem; }
  .price { font-weight: 700; color: #00658d; }
`;

const AIColumn = styled.div`
  position: sticky;
  top: 8rem; 
`;

const ChatInterface = styled.div`
  background: #ffffff;
  border-radius: 2rem;
  border: 1px solid #e0e3e5;
  box-shadow: 0 20px 40px rgba(0, 101, 141, 0.08);
  height: 700px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #00658d 0%, #004c6b 100%);
  padding: 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;

  .bot-icon {
    width: 3rem;
    height: 3rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  h3 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0;
  }

  span {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fcfdfd;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  
  ${(props) => props.$isBot ? `
    background-color: #e1f2ff;
    color: #003e58;
    align-self: flex-start;
    border-bottom-left-radius: 0.25rem;
  ` : `
    background-color: #ff5722;
    color: #ffffff;
    align-self: flex-end;
    border-bottom-right-radius: 0.25rem;
  `}
`;

const UploadPreview = styled.div`
  align-self: flex-end;
  width: 200px;
  height: 150px;
  background-color: #e0e3e5;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8fa3b0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ChatInputArea = styled.div`
  padding: 1.5rem;
  background: #ffffff;
  border-top: 1px solid #e0e3e5;
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const InputWrapper = styled.div`
  flex: 1;
  background: #f2f4f6;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #26b1ff;
    background: #ffffff;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 0.5rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1rem;
    outline: none;
    color: #191c1e;
    
    &::placeholder { color: #a0aab2; }
  }

  .upload-btn {
    background: none;
    border: none;
    color: #8fa3b0;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    
    &:hover { color: #00658d; }
  }
`;

const SendButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #ff5722;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:hover { background: #f4511e; }
  &:active { transform: scale(0.95); }
`;

const TreatmentDetail = () => {
  const { slug = 'braces' } = useParams();
  const navigate = useNavigate();
  const [treatmentData, setTreatmentData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = React.useRef(null);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    setTreatmentData(null);
    setNotFound(false);
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api/treatments/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then(data => {
        setTreatmentData(data);
        setMessages([
          {
            id: 1,
            sender: 'bot',
            text: `Hi! I'm your Sweet Tooth AI consultant. Upload a clear photo of your teeth, or ask me any specific questions about ${data.chatTopic || data.title.toLowerCase()}, and I'll give you a personalized analysis.`
          }
        ]);
      })
      .catch(err => {
        console.error(err);
        setNotFound(true);
      });
  }, [slug]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const sendToAI = async ({ text, image }) => {
    if (isSending) return;

    const userMsg = { id: Date.now(), sender: 'user', text: text || '', image: image || null };
    const priorHistory = messages.map((m) => ({ role: m.sender === 'bot' ? 'model' : 'user', text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api/ai/treatment-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          treatment: treatmentData,
          message: text || '',
          image: image || null,
          history: priorHistory,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: res.ok ? data.reply : data.error || 'Something went wrong. Please try again.',
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: 'I could not reach the AI service. Please check your connection and try again.' },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = () => {
    if (!inputText.trim() || isSending) return;
    sendToAI({ text: inputText.trim() });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      sendToAI({ text: inputText.trim(), image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    if (!isSending) fileInputRef.current?.click();
  };

  const handleBookClinic = (clinic) => {
    const q = encodeURIComponent(`${clinic.name} ${clinic.address || ''}`.trim());
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank', 'noopener');
  };

  if (notFound) {
    return (
      <PageContainer>
        <Navbar />
        <Content>
          <Header>
            <h1>Treatment Not Found</h1>
            <p>We couldn't find details for this treatment. Please head back to the treatments catalog and pick one.</p>
          </Header>
        </Content>
        <Footer />
      </PageContainer>
    );
  }

  if (!treatmentData) {
    return <PageContainer><Navbar /><Content><p>Loading...</p></Content><Footer /></PageContainer>;
  }

  return (
    <PageContainer>
      <Navbar />
      <Content>
        <Header>
          <h1>{treatmentData.title}</h1>
          <p>{treatmentData.description}</p>
        </Header>

        <LayoutGrid>
          <InfoColumn>
            <QuickStats>
              <StatCard>
                <div className="icon-box"><Clock size={24} /></div>
                <div>
                  <h4>Avg. Duration</h4>
                  <p>{treatmentData.duration}</p>
                </div>
              </StatCard>
              <StatCard>
                <div className="icon-box"><Banknote size={24} /></div>
                <div>
                  <h4>Est. Cost Range</h4>
                  <p>
                    <Currency amount={treatmentData.cost.min} /> - <Currency amount={treatmentData.cost.max} />
                  </p>
                </div>
              </StatCard>
            </QuickStats>

            <SectionBox>
              <h3><Sparkles size={32} color="#ff5722"/> {treatmentData.sectionLabel || 'Treatment Options'}</h3>
              <TypesGrid>
                {treatmentData.types.map((type, i) => (
                  <TypeItem key={i}>
                    <h4>{type.name}</h4>
                    <p>{type.desc}</p>
                    <span className="target">{type.target}</span>
                  </TypeItem>
                ))}
              </TypesGrid>
            </SectionBox>

            <SectionBox>
              <h3><CheckCircle2 size={32} color="#00658d"/> Long-term Benefits</h3>
              <List>
                {treatmentData.benefits.map((benefit, i) => (
                  <li key={i}>
                    <CheckCircle2 size={20} color="#ff5722" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </List>
            </SectionBox>

            <SectionBox>
              <h3><AlertTriangle size={32} color="#00658d"/> Things to Consider</h3>
              <List>
                {treatmentData.sideEffects.map((effect, i) => (
                  <li key={i}>
                    <AlertTriangle size={20} color="#ff5722" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{effect}</span>
                  </li>
                ))}
              </List>
            </SectionBox>

            <SectionBox>
              <h3><Sparkles size={32} color="#00658d"/> Recommended Care</h3>
              <p style={{ color: '#3e4850', fontSize: '0.95rem' }}>
                Maintain optimal oral health during your orthodontic journey with these essentials.
              </p>
              <ProductGrid>
                {treatmentData.products.map((product) => (
                  <ProductCard key={product.id}>
                    <h5>{product.name}</h5>
                    <p>{product.desc}</p>
                    <div className="price"><Currency amount={product.price} /></div>
                  </ProductCard>
                ))}
              </ProductGrid>
            </SectionBox>

            <SectionBox>
              <LocationHeader>
                <div>
                  <h3><MapPin size={32} color="#00658d"/> Nearby Specialists</h3>
                  <div className="loc-info">Searching near: Kumasi, Ashanti Region</div>
                </div>
                <button className="change-btn" onClick={() => navigate('/dashboard/clinics')}>Change Area</button>
              </LocationHeader>
              
              <ClinicList>
                {treatmentData.localClinics.map((clinic) => (
                  <ClinicCard key={clinic.id}>
                    <div className="clinic-details">
                      <h4>{clinic.name}</h4>
                      <div className="meta">
                        <span className="rating"><Star size={16} fill="#f59e0b" /> {clinic.rating} ({clinic.reviews})</span>
                        <span>•</span>
                        <span>{clinic.distance}</span>
                        <span>•</span>
                        <span>{clinic.address}</span>
                      </div>
                    </div>
                    <div className="clinic-action">
                      <p className="price"><Currency amount={clinic.estPrice} /></p>
                      <button onClick={() => handleBookClinic(clinic)}>Book Consult <ArrowRight size={16} /></button>
                    </div>
                  </ClinicCard>
                ))}
              </ClinicList>
            </SectionBox>
          </InfoColumn>

          <AIColumn>
            <ChatInterface>
              <ChatHeader>
                <div className="bot-icon"><Bot size={28} /></div>
                <div>
                  <h3>AI Treatment Analyst</h3>
                  <span>Online • Ready to scan</span>
                </div>
              </ChatHeader>

              <ChatMessages>
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      {msg.image && (
                        <UploadPreview>
                          <img src={msg.image} alt="User uploaded scan" />
                        </UploadPreview>
                      )}
                      {msg.text && <Message $isBot={msg.sender === 'bot'}>{msg.text}</Message>}
                    </motion.div>
                  ))}
                  {isSending && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ alignSelf: 'flex-start' }}
                    >
                      <Message $isBot style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          style={{ display: 'inline-flex' }}
                        >
                          <Loader2 size={16} />
                        </motion.span>
                        Analyzing...
                      </Message>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </ChatMessages>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageSelect}
              />

              <ChatInputArea>
                <InputWrapper>
                  <button className="upload-btn" title="Upload Scan" onClick={triggerUpload} disabled={isSending}><Paperclip size={20} /></button>
                  <input 
                    type="text" 
                    placeholder={`Ask about ${treatmentData.chatTopic || 'this treatment'} or upload your scan...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isSending}
                  />
                  <button className="upload-btn" title="Upload Photo" onClick={triggerUpload} disabled={isSending}><ImageIcon size={20} /></button>
                </InputWrapper>
                <SendButton onClick={handleSend} disabled={isSending} style={{ opacity: isSending ? 0.6 : 1 }}><Send size={20} /></SendButton>
              </ChatInputArea>
            </ChatInterface>
          </AIColumn>
        </LayoutGrid>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default TreatmentDetail;