import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  Camera,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Info,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fb;
`;

const Content = styled.main`
  flex: 1;
  padding: 10rem 1.25rem 6rem 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScanBox = styled(motion.div)`
  max-width: ${(props) => (props.$wide ? '960px' : '800px')};
  width: 100%;
  background: #ffffff;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 101, 141, 0.08);
  border: 1px solid #e0e3e5;
  text-align: center;
  transition: max-width 0.3s ease;

  @media (max-width: 768px) { padding: 2rem 1.5rem; }
`;

const Header = styled.div`
  margin-bottom: 2.5rem;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    color: #00658d;
    margin: 0 0 0.5rem 0;
    letter-spacing: 1px;
  }

  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.1rem;
    color: #3e4850;
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.5;
  }
`;

const Dropzone = styled.div`
  border: 3px dashed ${(props) => (props.$isDragging ? '#ff5722' : '#bdc8d1')};
  background-color: ${(props) => (props.$isDragging ? '#fff6f3' : '#fcfdfd')};
  border-radius: 1.5rem;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #26b1ff;
    background-color: #e1f2ff;
  }

  .icon-group {
    display: flex;
    gap: 1rem;
    color: #00658d;
  }

  h3 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #191c1e;
    margin: 0;
  }

  p {
    font-family: 'Hanken Grotesk', sans-serif;
    color: #8fa3b0;
    margin: 0;
  }

  .primary-btn {
    background: #ff5722;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 9999px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover { background: #f4511e; }
  }
`;

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e3e5;

  .badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    color: #8fa3b0;
    font-weight: 600;
  }
`;

// --- Results View ---
const ResultsWrapper = styled.div`
  text-align: left;
`;

const ResultsTop = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 220px 1fr;
    align-items: start;
  }
`;

const PreviewImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 1.25rem;
  overflow: hidden;
  background: #e1f2ff;
  border: 1px solid #e0e3e5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SummaryBlock = styled.div`
  h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.25rem;
    color: #00658d;
    margin: 0 0 0.75rem 0;
    letter-spacing: 0.5px;
  }
  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.05rem;
    color: #3e4850;
    line-height: 1.6;
    margin: 0;
  }
`;

const FindingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) { grid-template-columns: 1fr 1fr; }
`;

const FindingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  border-radius: 0.9rem;
  background: ${(props) => (props.$flag ? '#fff6f3' : '#f1f9f4')};
  border: 1px solid ${(props) => (props.$flag ? '#ffd9cc' : '#cdeed8')};
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #191c1e;

  .label {
    flex: 1;
  }
  .value {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: ${(props) => (props.$flag ? '#c2410c' : '#15803d')};
  }
`;

const ResultSectionTitle = styled.h3`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #191c1e;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProductCard = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem;
  border-radius: 1rem;
  background: #f7f9fb;
  border: 1px solid #e0e3e5;
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s;

  &:hover {
    border-color: #26b1ff;
    transform: translateY(-2px);
  }

  .cat {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #8fa3b0;
  }
  .name {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #191c1e;
  }
  .price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem;
    color: #00658d;
  }
`;

const Disclaimer = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background: #f2f4f6;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.85rem;
  color: #6b7780;
  line-height: 1.5;
  text-align: left;
  margin-bottom: 2rem;

  svg { flex-shrink: 0; margin-top: 2px; }
`;

const ScanAgainBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background: #00658d;
  color: white;
  border: none;
  border-radius: 9999px;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: #004c6b; }
`;

// Human-readable labels for the boolean findings returned by the API.
// `flagWhenTrue: true` means a `true` value is a concern (orange);
// otherwise `true` is the healthy state.
const FINDING_FIELDS = [
  { key: 'gum_inflammation_visible', label: 'Gum Inflammation', flagWhenTrue: true },
  { key: 'calculus_or_plaque_visible', label: 'Plaque / Calculus', flagWhenTrue: true },
  { key: 'visible_chips_or_cracks', label: 'Chips or Cracks', flagWhenTrue: true },
  { key: 'crowding_or_spacing_issues', label: 'Crowding / Spacing', flagWhenTrue: true },
  { key: 'gum_recession_signs', label: 'Gum Recession', flagWhenTrue: true },
];

const prettify = (val) =>
  typeof val === 'string'
    ? val.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : val;

const NewScan = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = React.useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startAnalysis(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      startAnalysis(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const resetScan = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setResult(null);
    setPreviewUrl(null);
    setError(null);
  };

  const startAnalysis = async (file) => {
    if (!file) return;

    setError(null);
    setResult(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL || 'https://fix-my-teeth-main-p5gegx.free.laravel.cloud'}/api/restify/teeth-scans`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await response.json();

      if (data.status === 'success' || data.status === 'fallback') {
        setResult(data);
      } else {
        setError(data.message || 'Analysis failed. Please try a clearer photo.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analysis = result?.data;

  return (
    <PageContainer>
      <Navbar />
      <Content>
        <ScanBox
          $wide={!!result}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Header>
                  <h1>Your Scan Results</h1>
                  <p>Here's what our AI observed from your photo.</p>
                </Header>

                <ResultsWrapper>
                  <ResultsTop>
                    {previewUrl && (
                      <PreviewImage>
                        <img src={previewUrl} alt="Your uploaded scan" />
                      </PreviewImage>
                    )}
                    <SummaryBlock>
                      <h2>Visual Summary</h2>
                      <p>{analysis.visual_summary}</p>
                    </SummaryBlock>
                  </ResultsTop>

                  <ResultSectionTitle>
                    <Sparkles size={20} color="#00658d" /> Health Findings
                  </ResultSectionTitle>
                  <FindingsGrid>
                    {analysis.enamel_coloration !== undefined && (
                      <FindingItem>
                        <CheckCircle2 size={20} color="#15803d" />
                        <span className="label">Enamel Coloration</span>
                        <span className="value">{prettify(analysis.enamel_coloration)}</span>
                      </FindingItem>
                    )}
                    {analysis.gum_tissue_color !== undefined && (
                      <FindingItem>
                        <CheckCircle2 size={20} color="#15803d" />
                        <span className="label">Gum Tissue Color</span>
                        <span className="value">{prettify(analysis.gum_tissue_color)}</span>
                      </FindingItem>
                    )}
                    {FINDING_FIELDS.filter((f) => analysis[f.key] !== undefined).map((f) => {
                      const isFlag = f.flagWhenTrue ? analysis[f.key] : !analysis[f.key];
                      return (
                        <FindingItem key={f.key} $flag={isFlag}>
                          {isFlag ? (
                            <AlertTriangle size={20} color="#c2410c" />
                          ) : (
                            <CheckCircle2 size={20} color="#15803d" />
                          )}
                          <span className="label">{f.label}</span>
                          <span className="value">{isFlag ? 'Detected' : 'Clear'}</span>
                        </FindingItem>
                      );
                    })}
                  </FindingsGrid>

                  {Array.isArray(analysis.recommended_products) && analysis.recommended_products.length > 0 && (
                    <>
                      <ResultSectionTitle>
                        <ShieldCheck size={20} color="#00658d" /> Recommended Products
                      </ResultSectionTitle>
                      <ProductsGrid>
                        {analysis.recommended_products.map((p, i) => (
                          <ProductCard
                            key={i}
                            href={p.url || '#'}
                            target={p.url ? '_blank' : undefined}
                            rel="noopener noreferrer"
                          >
                            <span className="cat">{p.category}</span>
                            <span className="name">{p.name}</span>
                            {p.price != null && <span className="price">${p.price}</span>}
                          </ProductCard>
                        ))}
                      </ProductsGrid>
                    </>
                  )}

                  {result.disclaimer && (
                    <Disclaimer>
                      <Info size={18} color="#8fa3b0" />
                      <span>{result.disclaimer}</span>
                    </Disclaimer>
                  )}

                  <div style={{ textAlign: 'center' }}>
                    <ScanAgainBtn onClick={resetScan}>
                      <RotateCcw size={18} /> Scan Another Photo
                    </ScanAgainBtn>
                  </div>
                </ResultsWrapper>
              </motion.div>
            ) : (
              <motion.div
                key="uploader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Header>
                  <h1>Start Your Free AI Scan</h1>
                  <p>Get instant insights on your oral health, treatment options, and cost estimates in seconds.</p>
                </Header>

                {error && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      background: '#ffebee',
                      color: '#c62828',
                      padding: '0.9rem 1rem',
                      borderRadius: '0.9rem',
                      marginBottom: '1.5rem',
                      fontFamily: 'Hanken Grotesk, sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    <AlertTriangle size={18} /> {error}
                  </div>
                )}

                {isAnalyzing ? (
                  <Dropzone style={{ borderColor: '#26b1ff', backgroundColor: '#e1f2ff' }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                      style={{ color: '#00658d' }}
                    >
                      <Sparkles size={48} />
                    </motion.div>
                    <h3>Analyzing your smile...</h3>
                    <p>Our AI is cross-referencing thousands of dental data points.</p>
                  </Dropzone>
                ) : (
                  <Dropzone
                    $isDragging={isDragging}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <div className="icon-group">
                      <UploadCloud size={48} />
                      <Camera size={48} />
                    </div>
                    <div>
                      <h3>Drag & Drop your photo here</h3>
                      <p>or click to browse your files</p>
                    </div>
                    <button className="primary-btn">
                      <Camera size={18} /> Take Photo Now
                    </button>
                  </Dropzone>
                )}

                <TrustBadges>
                  <div className="badge"><ShieldCheck size={18} color="#10b981" /> HIPAA Compliant</div>
                  <div className="badge"><ShieldCheck size={18} color="#10b981" /> End-to-End Encrypted</div>
                </TrustBadges>
              </motion.div>
            )}
          </AnimatePresence>
        </ScanBox>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default NewScan;