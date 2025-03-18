
import { Article, Category } from './types';

// Mock data for knowledge base articles
export const articles: Article[] = [
  {
    id: 'KB001',
    title: 'Troubleshooting Server Cooling Fan Failures',
    category: 'Hardware',
    tags: ['Cooling', 'Maintenance', 'Server'],
    lastUpdated: '2 days ago',
    excerpt: 'Comprehensive guide to diagnosing and resolving server cooling fan issues, including common failure patterns and replacement procedures.',
    views: 423,
    content: `
# Troubleshooting Server Cooling Fan Failures

Server cooling fans are critical components that prevent overheating and ensure optimal performance of data center equipment. This guide provides a systematic approach to diagnosing and resolving cooling fan issues in enterprise servers.

## Common Symptoms of Fan Failure

- Increased server temperature readings
- Audible alarms from the server
- Unusual noise (grinding, clicking, or high-pitched sounds)
- Server throttling due to thermal protection
- Complete server shutdown

## Diagnostic Steps

1. **Visual Inspection**
   - Check for physical obstructions around the fan
   - Inspect for dust accumulation on fan blades and heat sinks
   - Look for signs of physical damage to fan blades

2. **IPMI/iDRAC/iLO Monitoring**
   - Review fan speed readings from management interface
   - Check temperature sensors in the affected zones
   - Review system event logs for fan-related warnings

3. **Thermal Analysis**
   - Use thermal imaging to identify hot spots
   - Compare temperature distribution with baseline measurements
   - Analyze airflow patterns in the server chassis

## Replacement Procedures

### Hot-Swappable Fan Replacement
1. Identify the failed fan from management console
2. Prepare the replacement unit (verify correct model)
3. Remove the failed fan module by pressing release tabs
4. Insert new fan module until it clicks into place
5. Verify fan operation through management interface

### Non-Hot-Swappable Fan Replacement
1. Follow proper shutdown procedures
2. Disconnect power sources and wait 5 minutes
3. Ground yourself with anti-static wrist strap
4. Remove server cover according to manufacturer guidelines
5. Disconnect fan power connector from motherboard
6. Remove fan mounting screws or clips
7. Install new fan in reverse order
8. Verify connections before powering on

## Preventive Maintenance

- Implement regular cleaning schedule (every 3-6 months)
- Monitor fan speeds and temperature trends
- Replace fans proactively after 3-4 years of operation
- Ensure proper airflow management in racks

## Troubleshooting Decision Tree

| Symptom | Possible Cause | Solution |
|---------|----------------|----------|
| No fan rotation | Power connection issue | Check fan connector |
| | Fan controller failure | Replace fan controller |
| | Fan motor failure | Replace fan unit |
| Intermittent operation | Loose connection | Reseat fan connector |
| | Failing bearing | Replace fan unit |
| Excessive noise | Unbalanced fan | Replace fan unit |
| | Bearing wear | Replace fan unit |
| | Foreign object | Remove obstruction |

## Reference Materials

- Server manufacturer maintenance guide section 4.2
- Data center thermal management guidelines (ASHRAE TC 9.9)
- Internal cooling system design document TC-FAN-2022`
  },
  {
    id: 'KB002',
    title: 'Network Switch Configuration Best Practices',
    category: 'Network',
    tags: ['Configuration', 'Security', 'Performance'],
    lastUpdated: '1 week ago',
    excerpt: 'Optimal configuration settings for enterprise network switches to maximize throughput, minimize latency, and enhance security posture.',
    views: 289,
    content: `
# Network Switch Configuration Best Practices

This comprehensive guide outlines industry best practices for configuring enterprise network switches to ensure optimal performance, security, and reliability in data center environments.

## Initial Setup

### Physical Installation
- Ensure proper grounding
- Maintain adequate airflow around the switch
- Label all ports and connections
- Use appropriate cable management

### Basic Configuration
\`\`\`
// Hostname and domain configuration
switch(config)# hostname DC1-CORE-SW01
switch(config)# ip domain-name example.com

// Time synchronization
switch(config)# ntp server 10.1.1.254 prefer
switch(config)# clock timezone UTC

// Local authentication
switch(config)# username admin privilege 15 secret StrongPassword123!
\`\`\`

## Network Segmentation

### VLAN Configuration
\`\`\`
// Create VLANs
switch(config)# vlan 10
switch(config-vlan)# name SERVERS
switch(config)# vlan 20
switch(config-vlan)# name MANAGEMENT
switch(config)# vlan 30
switch(config-vlan)# name USER-ACCESS

// Trunk configuration
switch(config)# interface GigabitEthernet1/0/1
switch(config-if)# switchport mode trunk
switch(config-if)# switchport trunk allowed vlan 10,20,30
\`\`\`

## Security Measures

### Port Security
\`\`\`
switch(config)# interface range GigabitEthernet1/0/1 - 48
switch(config-if-range)# switchport port-security
switch(config-if-range)# switchport port-security maximum 2
switch(config-if-range)# switchport port-security violation restrict
\`\`\`

### Control Plane Protection
\`\`\`
switch(config)# control-plane
switch(config-cp)# service-policy input CONTROL-PLANE-POLICY
\`\`\`

### DHCP Snooping
\`\`\`
switch(config)# ip dhcp snooping
switch(config)# ip dhcp snooping vlan 10,20,30
switch(config)# interface GigabitEthernet1/0/48
switch(config-if)# ip dhcp snooping trust
\`\`\`

## Performance Optimization

### Spanning Tree Protocol
\`\`\`
switch(config)# spanning-tree mode rapid-pvst
switch(config)# spanning-tree portfast default
switch(config)# spanning-tree extend system-id
\`\`\`

### QoS Configuration
\`\`\`
switch(config)# mls qos
switch(config)# class-map VOICE-TRAFFIC
switch(config-cmap)# match dscp ef
switch(config)# policy-map QOS-POLICY
switch(config-pmap)# class VOICE-TRAFFIC
switch(config-pmap-c)# priority percent 10
\`\`\`

## Monitoring and Management

### SNMP Configuration
\`\`\`
switch(config)# snmp-server community ReadOnlyCommunity ro
switch(config)# snmp-server location "Data Center 1, Rack A3"
switch(config)# snmp-server contact "noc@example.com"
\`\`\`

### Syslog Configuration
\`\`\`
switch(config)# logging host 10.1.1.100
switch(config)# logging trap notifications
switch(config)# logging buffered 16384
\`\`\`

## High Availability

### Link Aggregation
\`\`\`
switch(config)# interface port-channel 1
switch(config-if)# description "Uplink to Core Switch"
switch(config)# interface range GigabitEthernet1/0/1 - 2
switch(config-if-range)# channel-group 1 mode active
\`\`\`

### First Hop Redundancy
\`\`\`
switch(config)# interface vlan 10
switch(config-if)# ip address 10.10.10.2 255.255.255.0
switch(config-if)# vrrp 10 ip 10.10.10.1
switch(config-if)# vrrp 10 priority 90
\`\`\`

## Baseline Performance Metrics

| Metric | Target Value | Alert Threshold |
|--------|--------------|----------------|
| CPU Utilization | <30% | >70% |
| Memory Utilization | <50% | >80% |
| Port Utilization | <50% | >80% |
| Packet Loss | 0% | >0.1% |
| Latency | <1ms | >10ms |

## Regular Maintenance Tasks

- Firmware updates (quarterly)
- Configuration backups (weekly)
- Security audit (monthly)
- Physical inspection (quarterly)
- Performance baseline review (monthly)

## Reference Documentation

- Switch manufacturer configuration guide v3.4
- Network Security Standards document SEC-NET-2023
- Change Management Procedure CM-PROC-22`
  },
  {
    id: 'KB003',
    title: 'Power Distribution Unit Maintenance Schedule',
    category: 'Power',
    tags: ['Maintenance', 'Scheduling', 'Power'],
    lastUpdated: '3 days ago',
    excerpt: 'Recommended maintenance intervals and procedures for data center PDUs, including testing protocols and failure mitigation strategies.',
    views: 156,
    content: `
# Power Distribution Unit Maintenance Schedule

This document outlines the recommended maintenance schedule for Power Distribution Units (PDUs) in enterprise data center environments to ensure continuous operation, prevent failures, and extend equipment lifespan.

## Maintenance Schedule Overview

| Timeframe | Maintenance Type | Personnel Required |
|-----------|------------------|-------------------|
| Monthly | Visual Inspection | Facilities Technician |
| Quarterly | Electrical Testing | Certified Electrician |
| Semi-Annual | Thermal Scanning | Power Systems Engineer |
| Annual | Comprehensive Audit | Power Systems Team |
| Biennial | Load Balancing Review | Power Systems Engineer |

## Monthly Maintenance Tasks

### Visual Inspection
- Check for physical damage to PDU chassis
- Verify all indicator lights are functioning correctly
- Ensure proper ventilation around PDUs
- Check for loose connections
- Verify display readings match expected values
- Document any anomalies

### Environmental Checks
- Measure ambient temperature around PDUs
- Check for excessive dust or debris
- Verify humidity levels are within specification (40-60%)
- Ensure no liquid sources are near PDUs

## Quarterly Maintenance Tasks

### Electrical Testing
- Measure voltage at PDU input and output
- Check current draw against rated capacity
- Verify phase balance in three-phase PDUs
- Test ground connections
- Validate circuit breaker functionality
- Log all measurements in maintenance system

### Software/Firmware
- Check for available firmware updates
- Verify network connectivity for managed PDUs
- Test remote management functions
- Backup PDU configuration
- Validate alerting functionality

## Semi-Annual Maintenance Tasks

### Thermal Scanning
- Perform infrared scanning of PDU components
- Document hotspots exceeding 40°C
- Compare thermal patterns to baseline
- Check for loose connections identified by heat signatures
- Remediate any thermal issues

### Load Testing
- Validate redundancy paths
- Simulate power transfer scenarios
- Test input transfer switch functionality
- Verify alarm propagation
- Document recovery times

## Annual Maintenance Tasks

### Comprehensive Audit
- Document all connected equipment
- Verify against asset management database
- Update single-line diagrams
- Recalibrate PDU sensors
- Test all protective devices
- Verify proper equipment rotation

### Power Quality Analysis
- Monitor harmonics
- Check for voltage fluctuations
- Analyze power factor
- Document transients
- Implement corrective measures as needed

## Biennial Maintenance Tasks

### Load Balancing Review
- Comprehensive power utilization assessment
- Redistribution of loads to optimize PDU usage
- Update capacity planning documentation
- Forecast future power requirements
- Develop recommendations for power infrastructure improvements

## Emergency Maintenance Procedures

### Responding to PDU Alarms
1. Document the alarm type and time
2. Verify real-time load measurements
3. Check environmental conditions
4. Assess critical loads affected
5. Implement appropriate response protocol
6. Document incident resolution

### Failure Recovery
1. Transfer load to redundant PDU
2. Isolate failed PDU
3. Perform root cause analysis
4. Replace components as necessary
5. Test PDU before returning to service
6. Document failure and resolution

## Testing and Documentation Requirements

- Maintain service logs for each PDU
- Document all maintenance activities
- Record all measurement values
- Update maintenance schedule based on findings
- Retain records for minimum of 3 years
- Develop trending analysis of PDU performance

## Reference Materials

- Equipment manufacturer maintenance manual v2.1
- NFPA 70B: Recommended Practice for Electrical Equipment Maintenance
- IEEE 3006.7: Recommended Practice for Determining the Reliability of 7x24 Power Systems in Data Centers
- Internal power management SOP PM-DC-2022`
  },
  {
    id: 'KB004',
    title: 'Database Performance Optimization Techniques',
    category: 'Software',
    tags: ['Database', 'Performance', 'Optimization'],
    lastUpdated: '5 days ago',
    excerpt: 'Advanced techniques for optimizing database performance in high-load environments, including indexing strategies and query optimization.',
    views: 312,
    content: `
# Database Performance Optimization Techniques

This comprehensive guide outlines advanced techniques and best practices for optimizing database performance in high-load enterprise environments. Follow these guidelines to improve query response times, reduce server load, and enhance overall database efficiency.

## Query Optimization

### Index Optimization
Proper indexing is crucial for database performance:

- Create indexes on frequently queried columns
- Consider composite indexes for multi-column queries
- Avoid over-indexing as it impacts write performance
- Regularly analyze index usage statistics
- Remove unused indexes

Example index creation:
\`\`\`sql
-- Create index on single column
CREATE INDEX idx_customer_lastname ON customers(last_name);

-- Create composite index
CREATE INDEX idx_order_customer_date ON orders(customer_id, order_date);

-- Create covering index
CREATE INDEX idx_products_covering ON products(product_id, name, price, category_id);
\`\`\`

### Query Rewriting
Optimize poorly performing queries:

- Avoid SELECT * and only request needed columns
- Use EXISTS instead of IN for better performance
- Limit results when possible
- Avoid functions on indexed columns
- Consider query hints for specific optimizations

Example query optimization:
\`\`\`sql
-- Instead of this:
SELECT * FROM orders 
WHERE customer_id IN (SELECT customer_id FROM customers WHERE region = 'West');

-- Use this:
SELECT o.order_id, o.order_date, o.total_amount 
FROM orders o
WHERE EXISTS (SELECT 1 FROM customers c WHERE c.customer_id = o.customer_id AND c.region = 'West');
\`\`\`

## Database Configuration

### Memory Allocation
Properly configure memory parameters:

| Parameter | Recommended Setting | Impact |
|-----------|---------------------|--------|
| Buffer Pool | 70-80% of available RAM | Caches data pages in memory |
| Query Cache | 5-10% of available RAM | Stores results of repeated queries |
| Sort Buffer | 2-4MB per connection | Affects performance of sorts and GROUP BY |
| Join Buffer | 2-4MB per connection | Affects join performance |

### Parallelism Settings
Configure parallel query execution:

- Set max degree of parallelism based on CPU cores
- Configure cost threshold for parallelism
- Adjust parallel worker threads based on workload

## Table and Schema Design

### Normalization vs. Denormalization
Balance normalization principles with performance needs:

- Normalize to 3NF for OLTP databases
- Consider strategic denormalization for reporting databases
- Use materialized views for complex aggregations
- Implement data partitioning for very large tables

### Data Types
Select appropriate data types:

- Use smallest data type that accommodates your data
- Prefer fixed-length types for frequently joined columns
- Consider storage and performance implications:

| Data Type | Storage | Performance Consideration |
|-----------|---------|---------------------------|
| CHAR(10) | Fixed 10 bytes | Faster for fixed-length strings |
| VARCHAR(10) | Variable 1-10 bytes + overhead | More space efficient for variable text |
| INT | 4 bytes | Optimal for integer values |
| BIGINT | 8 bytes | Use only when needed for large values |
| DATETIME | 8 bytes | Consider DATE if time not needed |

## Monitoring and Maintenance

### Regular Maintenance
Implement these maintenance tasks:

- Update statistics regularly
- Rebuild fragmented indexes
- Purge historical data
- Reclaim unused space
- Validate backup integrity

### Performance Monitoring
Track key performance metrics:

- Query execution time
- Cache hit ratio
- Disk I/O statistics
- Lock contention
- Wait statistics

Example monitoring script:
\`\`\`sql
-- Check for slow queries
SELECT query_text, execution_count, total_worker_time/execution_count AS avg_cpu_time
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS qt
ORDER BY avg_cpu_time DESC;

-- Check index fragmentation
SELECT OBJECT_NAME(ips.object_id) AS table_name,
       i.name AS index_name,
       ips.avg_fragmentation_in_percent
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ips
JOIN sys.indexes i ON i.object_id = ips.object_id AND i.index_id = ips.index_id
WHERE ips.avg_fragmentation_in_percent > 30
ORDER BY ips.avg_fragmentation_in_percent DESC;
\`\`\`

## Advanced Optimization Techniques

### Partitioning
Implement table partitioning for very large tables:

- Partition by date for time-series data
- Consider hash partitioning for evenly distributed access
- Align partitioning scheme with query patterns

### In-Memory OLTP
For extreme performance requirements:

- Identify appropriate tables for in-memory optimization
- Convert suitable stored procedures to natively compiled
- Monitor memory usage carefully
- Plan for appropriate buffer pool allocation

### Query Store
Utilize Query Store for performance tracking:

- Enable Query Store in production
- Regularly review top resource-consuming queries
- Identify query regressions after changes
- Force efficient execution plans when needed

## Reference Documentation

- Database platform specific tuning guide v4.2
- Performance Optimization internal standards doc DB-PERF-2023
- Query Tuning Methodology whitepaper QT-METHOD-22`
  },
  {
    id: 'KB005',
    title: 'Data Center Environment Monitoring Guidelines',
    category: 'Operations',
    tags: ['Monitoring', 'Environment', 'Sensors'],
    lastUpdated: '1 day ago',
    excerpt: 'Comprehensive guide to setting up environmental monitoring in data centers, including temperature, humidity, and airflow measurement.',
    views: 198,
    content: `
# Data Center Environment Monitoring Guidelines

This document provides comprehensive guidelines for implementing robust environmental monitoring systems in data center facilities to ensure optimal operating conditions, prevent equipment failures, and maximize energy efficiency.

## Monitoring Parameters

### Critical Parameters
These parameters require real-time monitoring and immediate alerting:

| Parameter | Recommended Range | Critical Threshold | Monitoring Frequency |
|-----------|-------------------|-------------------|---------------------|
| Temperature | 18-27°C (64-80°F) | <15°C or >32°C | Continuous |
| Humidity | 40-60% RH | <30% or >70% RH | Continuous |
| Dew Point | 5.5-15°C (41-59°F) | <2°C or >18°C | Continuous |
| Airflow | 1.5-2.0 m/s | <0.5 m/s | Continuous |
| Differential Pressure | 0.002-0.006 inH₂O | >0.01 inH₂O | Continuous |

### Secondary Parameters
These parameters require regular monitoring but less frequent alerting:

| Parameter | Recommended Range | Alert Threshold | Monitoring Frequency |
|-----------|-------------------|----------------|---------------------|
| Particulate Count | <100,000 particles/m³ | >500,000 particles/m³ | Hourly |
| Gaseous Contamination | <10 ppb SO₂, <40 ppb H₂S | >25 ppb SO₂, >50 ppb H₂S | Daily |
| Vibration | <0.5g acceleration | >1.0g acceleration | Hourly |
| Light Levels | 300-500 lux | <200 lux | Daily |
| Noise Levels | <75 dBA | >85 dBA | Daily |

## Sensor Placement

### Temperature Sensors
- Install at front and rear of racks
- Place at 1/3 and 2/3 rack height
- Ensure coverage of hot spots
- Monitor supply and return air paths
- Minimum density: 1 sensor per 2-3 racks

### Humidity Sensors
- Position at CRAC/CRAH return air paths
- Place in cold aisles
- Install near building entry points
- Monitor areas with potential water sources
- Minimum density: 1 sensor per 10-15 racks

### Airflow Sensors
- Place at rack inlets
- Position at raised floor tiles
- Install at CRAC/CRAH outlets
- Monitor near containment boundaries
- Minimum density: 1 sensor per 5 racks

### Pressure Sensors
- Install between hot and cold aisles
- Place at containment boundaries
- Position at room perimeters
- Monitor raised floor plenum
- Minimum density: 1 sensor per containment zone

## Monitoring System Architecture

### Hardware Components
- Temperature/humidity probes: Precision ±0.5°C, ±2% RH
- Airflow sensors: Hot-wire anemometer or differential pressure based
- Gateway devices: Industrial-grade, redundant power
- Network infrastructure: Dedicated monitoring network
- Backup power: UPS with minimum 30-minute runtime

### Software Requirements
- Real-time data collection (polling interval <60 seconds)
- Trend analysis with minimum 1-year historical data
- Automated alerting with multiple notification methods
- Integration with DCIM and BMS systems
- Visual mapping of sensor locations
- Mobile access capabilities
- Automated report generation

## Alert Configuration

### Alert Levels
Implement tiered alerting:

1. **Advisory (Yellow)**
   - Parameters approaching warning thresholds
   - Email notification to operations team
   - Review required within 24 hours

2. **Warning (Orange)**
   - Parameters outside recommended range
   - Email and SMS notification
   - Review required within 2 hours

3. **Critical (Red)**
   - Parameters at critical thresholds
   - Email, SMS, and automated phone call
   - Immediate response required

### Alert Management
- Implement alert aggregation to prevent alarm fatigue
- Define escalation procedures for unresolved alerts
- Document response procedures for each alert type
- Conduct monthly review of alert effectiveness
- Test alert systems weekly

## Reporting and Documentation

### Regular Reports
Generate the following reports:

- Daily environmental compliance report
- Weekly trend analysis
- Monthly capacity planning review
- Quarterly efficiency analysis

### Documentation Requirements
Maintain updated:

- Sensor location maps
- Calibration records
- Alert response procedures
- System architecture diagrams
- Maintenance schedules

## Calibration and Maintenance

### Calibration Schedule
- Temperature/humidity sensors: Annually
- Airflow sensors: Quarterly
- Pressure sensors: Semi-annually
- Particle counters: Monthly

### Maintenance Tasks
- Verify sensor readings with calibrated instruments
- Clean sensor elements according to manufacturer guidelines
- Replace backup batteries
- Update firmware and software
- Test communication paths and alert systems

## Reference Standards

- ASHRAE TC 9.9: Thermal Guidelines for Data Processing Environments
- ASHRAE TC 9.9: Particulate and Gaseous Contamination Guidelines
- TIA-942: Telecommunications Infrastructure Standard for Data Centers
- BICSI-002: Data Center Design and Implementation Best Practices

## Internal References

- Environmental Monitoring System Architecture Doc ENV-ARCH-2023
- Sensor Calibration Procedure ENV-CAL-22
- Alert Response Playbook ENV-ALERT-23`
  }
];

// Popular search terms
export const popularSearches: string[] = [
  'Cooling system',
  'Network performance',
  'Server rack layout',
  'Power redundancy',
  'Database backups',
  'Security protocols'
];

// Categories
export const categories: Category[] = [
  { name: 'Hardware', count: 28 },
  { name: 'Network', count: 19 },
  { name: 'Software', count: 24 },
  { name: 'Power', count: 12 },
  { name: 'Operations', count: 31 },
];
