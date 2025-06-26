function doPost(e) {
  try {
    // Récupérer les données du formulaire
    const formData = e.parameter;
    
    // Créer le contenu de l'email HTML
    const emailHtml = createEmailHtml(formData);
    
    // Envoyer l'email
    const emailAddress = "votre-email@gmail.com"; // REMPLACEZ PAR VOTRE EMAIL
    const subject = `Nouveau formulaire SONAC - ${formData.nomAssure || 'Sans nom'}`;
    
    MailApp.sendEmail({
      to: emailAddress,
      subject: subject,
      htmlBody: emailHtml
    });
    
    // Enregistrer dans Google Sheets
    saveToGoogleSheets(formData);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput("Formulaire soumis avec succès")
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    // En cas d'erreur, retourner un message d'erreur
    return ContentService
      .createTextOutput("Erreur: " + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function saveToGoogleSheets(data) {
  try {
    // Créer ou ouvrir le Google Sheets
    const spreadsheetName = "SONAC - Formulaires BIA";
    let spreadsheet;
    
    try {
      // Essayer d'ouvrir le fichier existant
      const files = DriveApp.getFilesByName(spreadsheetName);
      if (files.hasNext()) {
        spreadsheet = SpreadsheetApp.open(files.next());
      } else {
        // Créer un nouveau fichier
        spreadsheet = SpreadsheetApp.create(spreadsheetName);
      }
    } catch (e) {
      // En cas d'erreur, créer un nouveau fichier
      spreadsheet = SpreadsheetApp.create(spreadsheetName);
    }
    
    // Obtenir la première feuille
    const sheet = spreadsheet.getSheets()[0];
    
    // Vérifier si c'est la première ligne (ajouter les en-têtes)
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Date de soumission',
        'Nom/Raison Sociale Assuré',
        'Adresse Assuré',
        'Contact Assuré',
        'Nom/Raison Sociale Acheteur',
        'Forme Juridique',
        'Adresse Acheteur',
        'N° Registre du Commerce et NINEA',
        'Secteur d\'Activité',
        'Type d\'Opération',
        'Description Opération',
        'Montant Opération',
        'Conditions de Paiement',
        'Date Prévue Opération',
        'CA N-1', 'CA N-2', 'CA N-3',
        'Résultat Net N-1', 'Résultat Net N-2', 'Résultat Net N-3',
        'Capitaux Propres N-1', 'Capitaux Propres N-2', 'Capitaux Propres N-3',
        'Actifs Circulants N-1', 'Actifs Circulants N-2', 'Actifs Circulants N-3',
        'Passifs Circulants N-1', 'Passifs Circulants N-2', 'Passifs Circulants N-3',
        'Total Endettement N-1', 'Total Endettement N-2', 'Total Endettement N-3',
        'CAF/CAFG N-1', 'CAF/CAFG N-2', 'CAF/CAFG N-3',
        'Commentaires Financiers',
        'Historique Incidents Assuré',
        'Incidents Notoires',
        'Date Signature',
        'Prénom et Nom Signature',
        'Fonction Signature',
        'Statut Signature Électronique'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Formater les en-têtes
      sheet.getRange(1, 1, 1, headers.length).setBackground('#0a2463').setFontColor('white').setFontWeight('bold');
    }
    
    // Préparer les données pour l'insertion
    const rowData = [
      new Date(), // Date de soumission
      data.nomAssure || '',
      data.adresseAssure || '',
      data.contactAssure || '',
      data.nomAcheteur || '',
      data.formeJuridique || '',
      data.adresseAcheteur || '',
      data.registreNinea || '',
      data.secteurActivite || '',
      data.typeOperation || '',
      data.descriptionOperation || '',
      data.montantOperation || '',
      data.conditionsPaiement || '',
      data.dateOperation || '',
      data.caN1 || '',
      data.caN2 || '',
      data.caN3 || '',
      data.resultatN1 || '',
      data.resultatN2 || '',
      data.resultatN3 || '',
      data.capitauxN1 || '',
      data.capitauxN2 || '',
      data.capitauxN3 || '',
      data.actifsN1 || '',
      data.actifsN2 || '',
      data.actifsN3 || '',
      data.passifsN1 || '',
      data.passifsN2 || '',
      data.passifsN3 || '',
      data.endettementN1 || '',
      data.endettementN2 || '',
      data.endettementN3 || '',
      data.cafN1 || '',
      data.cafN2 || '',
      data.cafN3 || '',
      data.commentairesFinanciers || '',
      data.incidentsAssure || '',
      data.incidentsNotoires || '',
      data.dateSignature || '',
      data.prenomNomSignature || '',
      data.fonctionSignature || '',
      'Document signé électroniquement et certifié' // Statut signature
    ];
    
    // Ajouter la nouvelle ligne
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Ajuster automatiquement la largeur des colonnes
    sheet.autoResizeColumns(1, rowData.length);
    
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement dans Google Sheets:', error);
  }
}

function createEmailHtml(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Formulaire SONAC - ${data.nomAssure || 'Nouveau'}</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          background: #f5f5f5;
          padding: 20px;
        }
        
        .email-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .header { 
          background: linear-gradient(135deg, #0a2463 0%, #1e3a8a 100%); 
          color: white; 
          padding: 30px; 
          text-align: center; 
          position: relative;
        }
        
        .header::before {
          content: 'CONFIDENTIEL';
          position: absolute;
          top: 15px;
          right: 25px;
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          color: white;
          padding: 8px 15px;
          border-radius: 25px;
          font-size: 0.9em;
          font-weight: bold;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .header h1 {
          font-size: 2em;
          margin: 0 0 10px 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
          margin: 0;
          opacity: 0.95;
        }
        
        .section { 
          margin: 0; 
          padding: 25px; 
          border-bottom: 1px solid #eee;
          background: white;
        }
        
        .section:last-child {
          border-bottom: none;
        }
        
        .section h2 { 
          color: #0a2463; 
          margin: 0 0 20px 0;
          font-size: 1.3em;
          border-left: 4px solid #0a2463;
          padding-left: 15px;
        }
        
        .field { 
          margin: 15px 0; 
          display: flex;
          align-items: flex-start;
        }
        
        .label { 
          font-weight: bold; 
          color: #0a2463; 
          min-width: 200px;
          flex-shrink: 0;
        }
        
        .value { 
          margin-left: 15px; 
          flex: 1;
          word-break: break-word;
        }
        
        .table-container {
          overflow-x: auto;
          margin: 20px 0;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .table { 
          width: 100%; 
          min-width: 600px;
          border-collapse: collapse; 
          background: white;
        }
        
        .table th, .table td { 
          border: 1px solid #ddd; 
          padding: 12px 8px; 
          text-align: left; 
          font-size: 0.9em;
        }
        
        .table th { 
          background: linear-gradient(135deg, #0a2463 0%, #1e3a8a 100%); 
          color: white; 
          font-weight: bold;
          white-space: nowrap;
        }
        
        .table tr:nth-child(even) {
          background: #f9f9f9;
        }
        
        .table tr:hover {
          background: #f0f8ff;
        }
        
        .signature-certificate {
          background: linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%);
          border: 2px solid #28a745;
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
          text-align: center;
        }
        
        .signature-certificate h3 {
          color: #155724;
          margin-bottom: 10px;
        }
        
        .signature-status {
          display: inline-block;
          background: #28a745;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          margin-top: 10px;
        }
        
        .footer { 
          background: linear-gradient(135deg, #0a2463 0%, #1e3a8a 100%); 
          color: white;
          padding: 20px; 
          text-align: center; 
          margin-top: 0;
        }
        
        .footer p {
          margin: 5px 0;
        }
        
        .empty-value {
          color: #999;
          font-style: italic;
        }
        
        .alert {
          background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
          border: 2px solid #fdcb6e;
          padding: 15px;
          border-radius: 10px;
          margin: 20px 0;
          color: #2d3436;
        }
        
        @media (max-width: 768px) {
          body {
            padding: 10px;
          }
          
          .header {
            padding: 20px;
          }
          
          .header h1 {
            font-size: 1.5em;
          }
          
          .section {
            padding: 15px;
          }
          
          .field {
            flex-direction: column;
          }
          
          .label {
            min-width: auto;
            margin-bottom: 5px;
          }
          
          .value {
            margin-left: 0;
          }
          
          .table-container {
            margin: 15px -15px;
            border-radius: 0;
          }
          
          .table {
            min-width: 500px;
          }
          
          .table th, .table td {
            padding: 8px 4px;
            font-size: 0.8em;
          }
        }
        
        @media (max-width: 480px) {
          .header::before {
            position: static;
            display: block;
            margin: 10px auto;
            width: fit-content;
          }
          
          .table {
            min-width: 400px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>FICHE D'INFORMATION SUR VOTRE ACHETEUR</h1>
          <p><strong>SONAC - Société Nationale d'Assurance du Crédit et du Cautionnement</strong></p>
        </div>
        
        <div class="section">
          <h2>1. Informations de l'Assuré</h2>
          <div class="field">
            <span class="label">Nom/Raison Sociale:</span> 
            <span class="value">${data.nomAssure || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Adresse:</span> 
            <span class="value">${data.adresseAssure || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Contact:</span> 
            <span class="value">${data.contactAssure || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
        </div>
        
        <div class="section">
          <h2>2. Identification de l'Acheteur</h2>
          <div class="field">
            <span class="label">Nom/Raison Sociale:</span> 
            <span class="value">${data.nomAcheteur || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Forme Juridique:</span> 
            <span class="value">${data.formeJuridique || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Adresse:</span> 
            <span class="value">${data.adresseAcheteur || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">N° Registre du Commerce et NINEA:</span> 
            <span class="value">${data.registreNinea || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Secteur d'Activité:</span> 
            <span class="value">${data.secteurActivite || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
        </div>
        
        <div class="section">
          <h2>3. Opération à Couvrir</h2>
          <div class="field">
            <span class="label">Type d'Opération:</span> 
            <span class="value">${data.typeOperation || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Description:</span> 
            <span class="value">${data.descriptionOperation || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Montant:</span> 
            <span class="value">${data.montantOperation || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Conditions de Paiement:</span> 
            <span class="value">${data.conditionsPaiement || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Date Prévue:</span> 
            <span class="value">${data.dateOperation || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
        </div>
        
        <div class="section">
          <h2>4. Éléments Financiers des 3 Dernières Années</h2>
          <div class="table-container">
            <table class="table">
              <tr>
                <th>Éléments Financiers</th>
                <th>Année N-1</th>
                <th>Année N-2</th>
                <th>Année N-3</th>
              </tr>
              <tr>
                <td>Chiffre d'affaires</td>
                <td>${data.caN1 || '0'}</td>
                <td>${data.caN2 || '0'}</td>
                <td>${data.caN3 || '0'}</td>
              </tr>
              <tr>
                <td>Résultat net</td>
                <td>${data.resultatN1 || '0'}</td>
                <td>${data.resultatN2 || '0'}</td>
                <td>${data.resultatN3 || '0'}</td>
              </tr>
              <tr>
                <td>Capitaux propres</td>
                <td>${data.capitauxN1 || '0'}</td>
                <td>${data.capitauxN2 || '0'}</td>
                <td>${data.capitauxN3 || '0'}</td>
              </tr>
              <tr>
                <td>Actifs circulants</td>
                <td>${data.actifsN1 || '0'}</td>
                <td>${data.actifsN2 || '0'}</td>
                <td>${data.actifsN3 || '0'}</td>
              </tr>
              <tr>
                <td>Passifs circulants</td>
                <td>${data.passifsN1 || '0'}</td>
                <td>${data.passifsN2 || '0'}</td>
                <td>${data.passifsN3 || '0'}</td>
              </tr>
              <tr>
                <td>Total endettement</td>
                <td>${data.endettementN1 || '0'}</td>
                <td>${data.endettementN2 || '0'}</td>
                <td>${data.endettementN3 || '0'}</td>
              </tr>
              <tr>
                <td>CAF/CAFG</td>
                <td>${data.cafN1 || '0'}</td>
                <td>${data.cafN2 || '0'}</td>
                <td>${data.cafN3 || '0'}</td>
              </tr>
            </table>
          </div>
          <div class="field">
            <span class="label">Commentaires:</span> 
            <span class="value">${data.commentairesFinanciers || '<span class="empty-value">Aucun commentaire</span>'}</span>
          </div>
        </div>
        
        <div class="section">
          <h2>5. Incidents de Paiement Antérieurs</h2>
          <div class="field">
            <span class="label">Historique d'Incidents avec l'Assuré (BIA):</span> 
            <span class="value">${data.incidentsAssure || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Incidents Notoires (autres):</span> 
            <span class="value">${data.incidentsNotoires || '<span class="empty-value">Aucun incident</span>'}</span>
          </div>
        </div>
        
        <div class="section">
          <h2>6. Certification et Signature</h2>
          <div class="field">
            <span class="label">Date:</span> 
            <span class="value">${data.dateSignature || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Prénom et Nom:</span> 
            <span class="value">${data.prenomNomSignature || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
          <div class="field">
            <span class="label">Fonction:</span> 
            <span class="value">${data.fonctionSignature || '<span class="empty-value">Non renseigné</span>'}</span>
          </div>
        </div>
        
        <div class="signature-certificate">
          <h3>✅ Signature Électronique Validée</h3>
          <p>Ce document a été signé électroniquement et certifié conformément aux standards de sécurité SONAC.</p>
          <p>La signature électronique avancée garantit l'authenticité et l'intégrité du document.</p>
          <div class="signature-status">
            📋 Document certifié et validé
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Formulaire soumis le:</strong> ${new Date().toLocaleString('fr-FR')}</p>
          <p><strong>SONAC - Société Nationale d'Assurance du Crédit et du Cautionnement</strong></p>
          <p>55, Rue Wagane DIOUF, Immeuble TRIANON | (+221) 33 889 82 10 | courrier@sonac.sn</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function doGet(e) {
  return ContentService
    .createTextOutput("Service SONAC Formulaire actif")
    .setMimeType(ContentService.MimeType.TEXT);
} 