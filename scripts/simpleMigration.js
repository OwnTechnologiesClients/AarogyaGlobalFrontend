import fs from 'fs';
import path from 'path';

class SimpleMigrationService {
  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.treatmentsDir = path.join(this.dataDir, 'treatments');
    this.specialtiesDir = path.join(this.dataDir, 'specialties');
  }

  generateUnifiedData() {
    console.log('🔄 Generating unified data structure...');
    
    const unifiedData = {
      metadata: {
        version: "1.0",
        lastUpdated: new Date().toISOString(),
        description: "Unified data structure for Aarogya Global medical tourism platform"
      },
      specialties: {},
      globalHospitals: [],
      globalDoctors: [],
      specialtyList: []
    };
    
    // Read existing data files
    const treatmentFiles = fs.readdirSync(this.treatmentsDir).filter(f => f.endsWith('.json'));
    const specialtyFiles = fs.readdirSync(this.specialtiesDir).filter(f => f.endsWith('.json'));
    
    // Process each specialty
    for (const file of treatmentFiles) {
      const slug = file.replace('.json', '');
      
      try {
        const treatmentData = JSON.parse(fs.readFileSync(path.join(this.treatmentsDir, file), 'utf8'));
        const specialtyData = JSON.parse(fs.readFileSync(path.join(this.specialtiesDir, file), 'utf8'));
        
        // Merge data
        const unifiedSpecialty = this.mergeSpecialtyData(slug, treatmentData, specialtyData);
        unifiedData.specialties[slug] = unifiedSpecialty;
        
        // Add to specialty list
        unifiedData.specialtyList.push({
          id: slug,
          name: unifiedSpecialty.name,
          slug: slug,
          icon: unifiedSpecialty.icon,
          label: unifiedSpecialty.name,
          count: unifiedSpecialty.count || 0,
          color: unifiedSpecialty.color,
          description: unifiedSpecialty.description
        });
        
      } catch (error) {
        console.error(`Error processing ${slug}: ${error.message}`);
      }
    }
    
    // Add global hospitals and doctors from existing files
    try {
      const hospitalsData = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'hospitals.json'), 'utf8'));
      const doctorsData = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'doctors.json'), 'utf8'));
      
      unifiedData.globalHospitals = hospitalsData.hospitals || [];
      unifiedData.globalDoctors = doctorsData.doctors || [];
      
    } catch (error) {
      console.error(`Error reading global data: ${error.message}`);
    }
    
    return unifiedData;
  }

  mergeSpecialtyData(slug, treatmentData, specialtyData) {
    const treatment = treatmentData.treatment;
    const specialty = specialtyData.specialty;
    
    return {
      id: slug,
      name: specialty?.name || treatment?.name?.replace(' Worldwide', '') || slug,
      slug: slug,
      description: specialty?.description || treatment?.description || '',
      icon: specialty?.icon || 'lucide/Stethoscope',
      color: specialty?.color || '#92BDF6',
      count: specialty?.count || 0,
      overview: treatment?.overview || {
        description: treatment?.description || '',
        highlights: []
      },
      filters: specialtyData.filters || {
        categories: ["All", "Doctors", "Hospitals", "Treatments"],
        treatments: [],
        facilities: []
      },
      hospitals: treatment?.bestHospitals?.hospitals || [],
      doctors: treatment?.topDoctors?.doctors || [],
      treatments: treatment?.treatmentPackages?.packages || [],
      costs: treatment?.costs?.treatments || []
    };
  }

  saveUnifiedData(unifiedData) {
    const outputPath = path.join(this.dataDir, 'unifiedData.json');
    fs.writeFileSync(outputPath, JSON.stringify(unifiedData, null, 2));
    console.log(`✅ Unified data saved to ${outputPath}`);
  }

  async runMigration() {
    console.log('🚀 Starting data migration process...\n');
    
    // Generate unified data
    const unifiedData = this.generateUnifiedData();
    
    // Save unified data
    this.saveUnifiedData(unifiedData);
    
    console.log('\n🎉 Migration completed successfully!');
    console.log(`📈 Summary:`);
    console.log(`   - Total Specialties: ${unifiedData.specialtyList.length}`);
    console.log(`   - Total Hospitals: ${unifiedData.globalHospitals.length}`);
    console.log(`   - Total Doctors: ${unifiedData.globalDoctors.length}`);
    
    return true;
  }
}

// Run migration
const migrationService = new SimpleMigrationService();
migrationService.runMigration().then(success => {
  process.exit(success ? 0 : 1);
}); 