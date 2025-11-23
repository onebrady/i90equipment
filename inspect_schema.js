const { Client } = require('pg');

// Hardcoded for debugging
const dbUrl = 'postgresql://neondb_owner:npg_mTwU70jdICGo@ep-falling-sunset-ah1x6zov-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

const fs = require('fs');

async function inspect() {
    console.log('Connecting to:', dbUrl);
    let output = '';

    const client = new Client({
        connectionString: dbUrl,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        output += 'Connected.\n';

        const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

        output += `Tables: ${res.rows.map(r => r.table_name).join(', ')}\n`;

        for (const row of res.rows) {
            const tableName = row.table_name;
            output += `\n--- Table: ${tableName} ---\n`;
            const cols = await client.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = $1
      `, [tableName]);
            output += `Columns: ${cols.rows.map(c => `${c.column_name} (${c.data_type})`).join(', ')}\n`;

            const sample = await client.query(`SELECT * FROM "${tableName}" LIMIT 1`);
            if (sample.rows.length > 0) {
                output += `Sample Row Keys: ${Object.keys(sample.rows[0]).join(', ')}\n`;
                output += `Sample Row Data (Subset): ${JSON.stringify(sample.rows[0], null, 2)}\n`;
            } else {
                output += 'No data in table.\n';
            }
        }

        fs.writeFileSync('schema_info.txt', output);
        console.log('Schema info written to schema_info.txt');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

inspect();
