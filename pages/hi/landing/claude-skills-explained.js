import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

export default function ClaudeSkillsExplainedHi() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Claude Skills व्याख्या",
    description:
      "जानें Claude Skills क्या हैं, Anthropic Skills कैसे काम करते हैं, इन्हें कैसे उपयोग करें और MCP से इनकी तुलना कैसे करें।",
    url: `${site.domain}/hi/landing/claude-skills-explained`,
    inLanguage: "hi"
  };

  return (
    <>
      <SeoHead
        title="Claude Skills व्याख्या: काम, उपयोग और MCP तुलना"
        description="जानें Claude Skills क्या हैं, Anthropic Skills कैसे काम करते हैं, इन्हें कैसे उपयोग करें और वास्तविक उपयोग में MCP से इनकी तुलना कैसे करें।"
        path="/hi/landing/claude-skills-explained"
        keywords="Claude Skills, Anthropic Skills, Skills vs MCP, Claude Skills उपयोग"
        jsonLd={jsonLd}
        ogType="website"
      />

      <div className="content-landing">
        <section className="page-hero">
          <div>
            <p className="eyebrow">Claude Skills व्याख्या</p>
            <h1>Claude Skills व्याख्या</h1>
            <p>
              Claude Skills, Anthropic Skills और MCP के बीच व्यावहारिक तुलना की स्पष्ट व्याख्या।
            </p>
          </div>
        </section>

        <section className="section">
          <p className="lead">
            Claude Skills, Anthropic इकोसिस्टम का एक मुख्य हिस्सा हैं, जो Claude के साथ इंटरैक्शन को अधिक संरचित,
            पुन: उपयोग योग्य और भरोसेमंद बनाते हैं।
          </p>
          <p className="lead">
            लेकिन "Anthropic skills", "Claude skills" और MCP जैसे शब्द कई डेवलपर्स के लिए भ्रमित करने वाले हैं।
            आधिकारिक डॉक्यूमेंटेशन अक्सर बिखरा होता है, और कम्युनिटी उदाहरण अलग-अलग रिपॉज़िटरी व चर्चाओं में फैले रहते हैं।
          </p>
          <p className="lead">
            यह पेज बताता है कि Claude Skills क्या हैं, कैसे काम करते हैं, कब उपयोग करना चाहिए और MCP से कैसे अलग हैं —
            मार्केटिंग भाषा के बजाय व्यावहारिक समझ के साथ।
          </p>
        </section>

        <section className="section">
          <h2>Claude Skills क्या हैं?</h2>
          <p>
            Claude Skills संरचित क्षमताएँ हैं जो यह परिभाषित करती हैं कि Claude को ऐप्स और वर्कफ़्लोज़ में कैसे उपयोग किया जाए।
          </p>
          <p>
            एक Skill आमतौर पर एक पुन: उपयोग योग्य व्यवहार, टूल या वर्कफ़्लो पैटर्न होता है जिसे Claude किसी कार्य को हल करते समय
            कॉल कर सकता है। एड-हॉक प्रॉम्प्ट्स की जगह Skills स्पष्ट इनपुट, सीमाएँ और अपेक्षित आउटपुट तय करती हैं।
          </p>
          <p>
            व्यवहार में, Claude Skills AI सिस्टम्स को अधिक अनुमानित, मेंटेन करने में आसान और स्केल करने योग्य बनाती हैं।
          </p>
        </section>

        <section className="section">
          <h2>Anthropic Skills क्या हैं?</h2>
          <p>
            "Anthropic skills" आमतौर पर Anthropic इकोसिस्टम में बने या वर्णित Claude Skills को संदर्भित करता है।
          </p>
          <p>
            इनमें आधिकारिक उदाहरण, अनुशंसित पैटर्न या कम्युनिटी इम्प्लीमेंटेशन शामिल हो सकते हैं जो सुरक्षा,
            रीजनिंग और संरचित इंटरैक्शन के Anthropic दृष्टिकोण से मेल खाते हैं।
          </p>
          <p>
            यह कोई एक मानकीकृत फ़ॉर्मेट नहीं है, बल्कि वास्तविक उपयोग के लिए बढ़ता हुआ पैटर्न सेट है।
          </p>
        </section>

        <section className="section">
          <h2>Anthropic Skills vs MCP</h2>
          <p>Anthropic Skills और MCP AI सिस्टम डिज़ाइन की अलग-अलग परतों को संबोधित करते हैं।</p>
          <p>
            Anthropic Skills इंटरैक्शन और वर्कफ़्लो स्तर पर पुन: उपयोग योग्य क्षमताएँ परिभाषित करती हैं — यानी Claude क्या करेगा,
            कैसे सोचेगा, और किन व्यवहारों को पुन: उपयोग किया जाएगा।
          </p>
          <p>
            MCP अधिकतर प्रोटोकॉल-स्तर समन्वय और सिस्टम घटकों के बीच मैसेज हैंडलिंग पर केंद्रित होता है, जो
            इंफ्रास्ट्रक्चर-हैवी या मल्टी-एजेंट सिस्टम्स में उपयोगी है।
          </p>
          <p>
            अधिकांश ऐप डेवलपर्स के लिए Claude Skills जल्दी अपनाई जा सकती हैं और तेज़ वैल्यू देती हैं, जबकि MCP जटिल
            सिस्टम-स्तरीय ऑर्केस्ट्रेशन के लिए बेहतर है।
          </p>
        </section>

        <section className="section">
          <h2>Claude Skills कैसे उपयोग करें</h2>
          <p>आमतौर पर Claude Skills उपयोग करने के तीन स्टेप होते हैं:</p>
          <ol className="step-list">
            <li>Skill का उद्देश्य और समस्या परिभाषित करें</li>
            <li>इनपुट, आउटपुट और सीमाएँ तय करें</li>
            <li>Skill को ऐप/वर्कफ़्लो/टूल में इंटीग्रेट करें</li>
          </ol>
          <p>
            ज़्यादातर डेवलपर्स पहले मौजूदा Skills देखते हैं और बाद में अपनी बनाते हैं। वास्तविक उदाहरण यह समझने में मदद करते हैं
            कि Skills कैसे संरचित हैं और Claude की सोच को कैसे प्रभावित करते हैं।
          </p>
        </section>

        <section className="section">
          <h2>Claude Skills के सामान्य उपयोग</h2>
          <p>Claude Skills का उपयोग अक्सर इन परिदृश्यों में होता है:</p>
          <ul className="step-list">
            <li>संरचित डेटा एक्सट्रैक्शन और ट्रांसफ़ॉर्मेशन</li>
            <li>मल्टी-स्टेप रीजनिंग वर्कफ़्लोज़</li>
            <li>टूल उपयोग और फ़ंक्शन कॉलिंग</li>
            <li>डोमेन-विशिष्ट असिस्टेंट्स</li>
            <li>ऐप्स में पुन: उपयोग योग्य ऑटोमेशन पैटर्न</li>
          </ul>
          <p>
            इन व्यवहारों को Skills में समेटने से प्रॉम्प्ट की जटिलता घटती है और भरोसेमंद आउटपुट मिलते हैं।
          </p>
        </section>

        <section className="section">
          <h2>Anthropic Skills लाइब्रेरी देखें</h2>
          <p>
            शुरुआत आसान बनाने के लिए हम एक क्यूरेटेड Anthropic Skills लाइब्रेरी रखते हैं जिसमें वास्तविक उदाहरण,
            प्रयोगात्मक टूल्स और कम्युनिटी योगदान शामिल हैं।
          </p>
          <p>
            हर Skill को उपयोग-केस, जटिलता और इंटीग्रेशन पैटर्न के अनुसार वर्गीकृत किया गया है ताकि सही उदाहरण जल्दी मिले।
          </p>
          <div className="cta-row">
            <a className="btn btn--primary" href="/hi/skills">Anthropic Skills डायरेक्टरी देखें</a>
            <a className="btn btn--ghost" href="/hi">होम पेज</a>
          </div>
        </section>

        <section className="section cta-section">
          <h2>Anthropic Skills डायरेक्टरी से शुरुआत करें</h2>
          <p>
            Claude Skills को जल्दी समझने से विकास समय बचता है और ट्रायल-एंड-एरर कम होता है।
          </p>
          <p>
            यदि आप Anthropic इकोसिस्टम एक्सप्लोर कर रहे हैं, तो यह डायरेक्टरी उदाहरण खोजने, तरीकों की तुलना करने और
            संरचित AI वर्कफ़्लोज़ बनाने के लिए व्यावहारिक शुरुआती पॉइंट देती है।
          </p>
          <a className="btn btn--primary" href="/hi/skills">Anthropic Skills डायरेक्टरी देखें</a>
        </section>
      </div>
    </>
  );
}
