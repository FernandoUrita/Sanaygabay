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
        const { name, role, message, rating } = JSON.parse(event.body);

        if (!name || !message || !rating) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Name, message, and rating are required' })
            };
        }

        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        );

        const { data, error } = await supabase
            .from('testimonials')
            .insert([
                {
                    name: name.trim(),
                    role: role ? role.trim() : 'Gumagamit',
                    message: message.trim(),
                    rating: parseInt(rating)
                }
            ]);

        if (error) {
            console.error('Supabase error:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to save testimonial' })
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