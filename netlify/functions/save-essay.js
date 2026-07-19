const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { name, email, title, original, translated, score, date, time } = JSON.parse(event.body);

        if (!name || !email || !title || !original) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Name, email, title, and original essay are required' })
            };
        }

        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        );

        const { data, error } = await supabase
            .from('essays')
            .insert([
                {
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    title: title.trim(),
                    original: original.trim(),
                    translated: translated || 'Walang translation na ginawa.',
                    score: score || 0,
                    date: date || new Date().toLocaleDateString('tl-PH'),
                    time: time || new Date().toLocaleTimeString('tl-PH'),
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            console.error('Supabase error:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to save essay' })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, data })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};