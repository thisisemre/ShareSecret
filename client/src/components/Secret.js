import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Secret.css';

const MAX_SEEN = 5;

function Secret({onSecretsFinished}) {
    const [secretData, setSecretData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [secretIndex, setSecretIndex] = useState(0); // Tıklanan sıranın indeksini saklar

    useEffect(() => {
        // Axios ile veri alma işlemi
        axios.get('http://localhost:5000/api/secret')
            .then(response => {
                setSecretData(response.data); // Veriyi state'e kaydet
                setLoading(false); // Yükleme tamamlandı
            })
            .catch(error => {
                setError(error); // Hata durumunu state'e kaydet
                setLoading(false); // Yükleme tamamlandı
            });
    }, []); // Boş bağımlılık dizisi ile sadece bir kez çalışır

    function handleLikeDislike(){
        secretSeen();
        setSecretIndex(secretIndex + 1);
    };

    async function secretSeen(){
        try {
            const result = await axios.put(`http://localhost:5000/api/secret/${secretData[secretIndex].id}`);//seen+1
            if(result.data.seen >= MAX_SEEN){
                await axios.delete(`http://localhost:5000/api/secret/${secretData[secretIndex].id}`);//delete
                alert("You are the last person to see this secret");
            };
        } catch (error) {
            console.error('Error updating secret:', error);
        }
        
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (secretIndex >= secretData.length) {
        
        onSecretsFinished();
        return null;
    }
    

    return (
        <div className='secret-container'>
            <h2>Secret</h2>
            {secretData[secretIndex] && (
                <div >
                    <div className='secret-buttons'>
                        
                    <button onClick={handleLikeDislike} >
                            Dislike
                        </button>

                        <button onClick={handleLikeDislike} >
                            Like
                        </button>

                    </div>
                    <div className='secret-content'>
                        <p>Seen: {secretData[secretIndex].seen}/{MAX_SEEN}</p>
                        <p>Secret: {secretData[secretIndex].secret}</p>
                        <p>Username: {secretData[secretIndex].username}</p>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default Secret;
