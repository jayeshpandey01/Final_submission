# MARIDA: Marine Debris Detection from Sentinel-2 Remote Sensing Data
## Comprehensive Research Documentation

![Marine Debris Archive Logo](./docs/marida_trans.png)

## Table of Contents
1. [Project Overview](#project-overview)
2. [Dataset Description](#dataset-description)
3. [Methodology and Algorithms](#methodology-and-algorithms)
4. [Technical Implementation](#technical-implementation)
5. [Experimental Setup](#experimental-setup)
6. [Results and Evaluation](#results-and-evaluation)
7. [Installation and Usage](#installation-and-usage)
8. [Research Contributions](#research-contributions)

---

## Project Overview

### Abstract
The Marine Debris Archive (MARIDA) is a comprehensive benchmark dataset for marine debris detection from Sentinel-2 multispectral satellite imagery. This project implements three distinct machine learning approaches for marine debris classification: **U-Net for semantic segmentation**, **Random Forest for pixel-level classification**, and **ResNet for multi-label patch classification**.

### Research Objectives
1. **Primary Goal**: Develop automated methods for detecting marine plastic debris in satellite imagery
2. **Secondary Goals**: 
   - Compare different machine learning approaches for marine debris detection
   - Establish baseline performance metrics for future research
   - Provide open-source tools for marine debris monitoring

### Key Innovation
This work addresses the critical environmental challenge of marine plastic pollution by leveraging satellite remote sensing and deep learning techniques, providing a scalable solution for global marine debris monitoring.

---

## Dataset Description

### Data Characteristics
- **Source**: Sentinel-2 multispectral satellite imagery
- **Spatial Resolution**: 10-20m per pixel
- **Temporal Coverage**: Multiple acquisition dates
- **Geographic Coverage**: Global coastal and marine areas
- **Total Patches**: 1,381 annotated image patches (256×256 pixels)
- **Spectral Bands**: 11 bands from Sentinel-2 MSI sensor

### Spectral Band Configuration
```python
# Sentinel-2 bands used in MARIDA
bands = {
    'nm440': 0,   # Coastal aerosol (Band 1)
    'nm490': 1,   # Blue (Band 2)
    'nm560': 2,   # Green (Band 3)
    'nm665': 3,   # Red (Band 4)
    'nm705': 4,   # Red Edge 1 (Band 5)
    'nm740': 5,   # Red Edge 2 (Band 6)
    'nm783': 6,   # Red Edge 3 (Band 7)
    'nm842': 7,   # NIR (Band 8)
    'nm865': 8,   # NIR narrow (Band 8A)
    'nm1600': 9,  # SWIR 1 (Band 11)
    'nm2200': 10  # SWIR 2 (Band 12)
}
```

### Class Distribution
The dataset includes 15 distinct classes with the following mapping:
```yaml
Classes:
  1: Marine Debris (Target class)
  2: Dense Sargassum
  3: Sparse Sargassum
  4: Natural Organic Material
  5: Ship
  6: Clouds
  7: Marine Water
  8: Sediment-Laden Water
  9: Foam
  10: Turbid Water
  11: Shallow Water
  12: Waves
  13: Cloud Shadows
  14: Wakes
  15: Mixed Water
```

### Data Preprocessing
#### Normalization Parameters
```python
# Computed from training data
bands_mean = [0.05197577, 0.04783991, 0.04056812, 0.03163572, 0.02972606, 
              0.03457443, 0.03875053, 0.03436435, 0.0392113, 0.02358126, 0.01588816]

bands_std = [0.04725893, 0.04743808, 0.04699043, 0.04967381, 0.04946782, 
             0.06458357, 0.07594915, 0.07120246, 0.08251058, 0.05111466, 0.03524419]
```

---

## Methodology and Algorithms

### 1. Semantic Segmentation with U-Net

#### Architecture Overview
The U-Net architecture implements an encoder-decoder structure with skip connections for pixel-level semantic segmentation.

#### Mathematical Formulation
**Encoder (Contracting Path):**
```
x₁ = Conv₃ₓ₃(BN(ReLU(Conv₃ₓ₃(input))))
x₂ = MaxPool₂ₓ₂(x₁)
x₃ = Conv₃ₓ₃(BN(ReLU(Conv₃ₓ₃(x₂))))
...
```

**Decoder (Expanding Path):**
```
y₁ = Upsample₂ₓ₂(x_bottom)
y₂ = Conv₃ₓ₃(BN(ReLU(Concat(y₁, x_skip))))
...
```

#### Loss Function
**Weighted Cross-Entropy Loss:**
```
L = -∑ᵢ∑ⱼ wⱼ · yᵢⱼ · log(ŷᵢⱼ)
```
Where:
- `wⱼ` = class weight for class j
- `yᵢⱼ` = true label for pixel i, class j
- `ŷᵢⱼ` = predicted probability for pixel i, class j

#### Weight Calculation
```python
def gen_weights(class_distribution, c=1.4):
    """Generate class weights inversely proportional to class frequency"""
    return 1 / torch.log(c + class_distribution)
```

### 2. Random Forest Classification

#### Algorithm Description
Random Forest combines multiple decision trees using bootstrap aggregating (bagging) to improve prediction accuracy and control overfitting.

#### Feature Engineering
**Spectral Indices Computation:**

1. **Normalized Difference Vegetation Index (NDVI):**
   ```
   NDVI = (NIR - Red) / (NIR + Red)
   ```

2. **Floating Algae Index (FAI):**
   ```
   FAI = NIR - [Red + (SWIR₁ - Red) × (λ_NIR - λ_Red) / (λ_SWIR₁ - λ_Red)]
   ```

3. **Floating Debris Index (FDI):**
   ```
   FDI = NIR - [RedEdge + 10 × (SWIR₁ - RedEdge) × (λ_NIR - λ_RedEdge) / (λ_SWIR₁ - λ_RedEdge)]
   ```

4. **Sediment Index (SI):**
   ```
   SI = [(1 - Blue) × (1 - Green) × (1 - Red)]^(1/3)
   ```

**Texture Features (GLCM):**
Gray-Level Co-occurrence Matrix features computed for each patch:
- Contrast: `∑ᵢ∑ⱼ(i-j)² × P(i,j)`
- Dissimilarity: `∑ᵢ∑ⱼ|i-j| × P(i,j)`
- Homogeneity: `∑ᵢ∑ⱼ P(i,j) / (1 + (i-j)²)`
- Energy: `∑ᵢ∑ⱼ P(i,j)²`
- Correlation: `∑ᵢ∑ⱼ ((i×j×P(i,j)) - μₓμᵧ) / (σₓσᵧ)`

#### Hyperparameters
```python
RandomForestClassifier(
    n_estimators=125,
    criterion='gini',
    max_depth=20,
    min_samples_leaf=1,
    class_weight='balanced_subsample',
    random_state=5,
    n_jobs=-1
)
```

### 3. Multi-Label Classification with ResNet

#### Architecture
Modified ResNet-50 architecture for multi-label classification:
```python
class ResNet(nn.Module):
    def __init__(self, input_bands=11, output_classes=11):
        # Encoder: ResNet-50 backbone
        # Modified first conv layer for 11-band input
        # Global Average Pooling
        # Fully Connected layer for classification
```

#### Loss Function
**Binary Cross-Entropy with Logits:**
```
L = -∑ᵢ∑ⱼ [wⱼ × yᵢⱼ × log(σ(zᵢⱼ)) + (1-yᵢⱼ) × log(1-σ(zᵢⱼ))]
```
Where:
- `σ(z)` = sigmoid function
- `wⱼ` = positive class weight for class j

#### Weight Calculation
```python
# Positive class weights (negative/positive ratio per class)
pos_weight = torch.Tensor([2.65, 27.92, 11.39, 18.83, 6.80, 6.46, 0.61, 
                          27.92, 22.13, 5.03, 17.26, 29.17, 16.79, 12.88, 9.06])
```

---

## Technical Implementation

### Data Loading and Preprocessing

#### Spectral Signature Extraction
```python
def ImageToDataframe(RefImage, cols_mapping={}, keep_annotated=True, coordinates=True):
    """
    Extract spectral signatures from satellite imagery
    
    Process:
    1. Load multispectral image using rasterio
    2. Load corresponding classification and confidence masks
    3. Extract geographic coordinates using geotransform
    4. Reshape to pixel-level dataframe
    5. Apply class and confidence mappings
    """
```

#### Data Augmentation
**Training Augmentations:**
```python
transform_train = transforms.Compose([
    transforms.ToTensor(),
    RandomRotationTransform([-90, 0, 90, 180]),  # 4-fold rotation
    transforms.RandomHorizontalFlip(),            # Horizontal flip
    transforms.Normalize(bands_mean, bands_std)   # Z-score normalization
])
```

### Model Training Procedures

#### U-Net Training Loop
```python
def train_epoch(model, dataloader, criterion, optimizer, device):
    model.train()
    total_loss = 0
    
    for batch_idx, (data, target) in enumerate(dataloader):
        data, target = data.to(device), target.to(device)
        
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
    
    return total_loss / len(dataloader)
```

#### Learning Rate Scheduling
**MultiStepLR Scheduler:**
```python
scheduler = torch.optim.lr_scheduler.MultiStepLR(
    optimizer, 
    milestones=[5, 10, 15], 
    gamma=0.2
)
```

**ReduceLROnPlateau Scheduler:**
```python
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, 
    mode='min', 
    factor=0.2, 
    patience=10
)
```

---

## Experimental Setup

### Hardware Requirements
- **GPU**: NVIDIA GPU with CUDA support (recommended: RTX 3080 or better)
- **RAM**: Minimum 16GB, recommended 32GB
- **Storage**: 50GB free space for dataset and models

### Software Environment
```yaml
Dependencies:
  - Python: 3.7.10
  - PyTorch: 1.7.0
  - CUDA: 11.0
  - Rasterio: 1.0.21 (alternative to GDAL)
  - Scikit-learn: 0.24.2
  - NumPy: 1.20.2
  - Pandas: 1.2.4
  - TensorBoard: 2.20.0
```

### Training Configuration

#### U-Net Parameters
```python
unet_config = {
    'input_channels': 11,
    'output_classes': 11,  # or 15 without aggregation
    'hidden_channels': 16,
    'batch_size': 32,
    'learning_rate': 2e-4,
    'epochs': 20,
    'weight_decay': 1e-6
}
```

#### ResNet Parameters
```python
resnet_config = {
    'input_channels': 11,
    'output_classes': 11,  # or 15 without aggregation
    'batch_size': 32,
    'learning_rate': 2e-4,
    'epochs': 20,
    'weight_param': 1.6,
    'threshold': 0.5
}
```

### Data Splits
- **Training Set**: 694 patches (50.3%)
- **Validation Set**: 328 patches (23.8%)
- **Test Set**: 359 patches (25.9%)

---

## Results and Evaluation

### Evaluation Metrics

#### Semantic Segmentation Metrics
```python
def Evaluation(y_predicted, y_true):
    metrics = {
        'macro_precision': precision_score(y_true, y_predicted, average='macro'),
        'micro_precision': precision_score(y_true, y_predicted, average='micro'),
        'macro_recall': recall_score(y_true, y_predicted, average='macro'),
        'micro_recall': recall_score(y_true, y_predicted, average='micro'),
        'macro_f1': f1_score(y_true, y_predicted, average='macro'),
        'micro_f1': f1_score(y_true, y_predicted, average='micro'),
        'accuracy': accuracy_score(y_true, y_predicted),
        'iou': jaccard_score(y_true, y_predicted, average='macro')
    }
    return metrics
```

#### Multi-Label Classification Metrics
```python
def Evaluation_ML(y_predicted, predicted_probs, y_true):
    metrics = {
        'hamming_loss': hamming_loss(y_true, y_predicted),
        'coverage_error': coverage_error(y_true, predicted_probs),
        'label_ranking_loss': label_ranking_loss(y_true, predicted_probs),
        'sample_f1': f1_score(y_true, y_predicted, average='samples'),
        'macro_f1': f1_score(y_true, y_predicted, average='macro'),
        'micro_f1': f1_score(y_true, y_predicted, average='micro')
    }
    return metrics
```

### Performance Analysis

#### Class Imbalance Handling
The dataset exhibits significant class imbalance:
- Marine Debris: 0.45% of pixels
- Marine Water: 20.23% of pixels
- Sediment-Laden Water: 35.94% of pixels

**Solution**: Weighted loss functions with inverse frequency weighting:
```python
weight = 1 / torch.log(c + class_frequency)
```

#### Confusion Matrix Analysis
```python
def confusion_matrix(y_gt, y_pred, labels):
    """
    Generate comprehensive confusion matrix with:
    - Per-class Precision, Recall, F1-score
    - Intersection over Union (IoU)
    - Overall Accuracy (OA)
    - Mean Per-class Accuracy (mPA)
    """
```

---

## Installation and Usage

### Quick Start
```bash
# Clone repository
git clone https://github.com/marine-debris/marine-debris.github.io.git
cd marine-debris.github.io

# Install dependencies (using rasterio instead of GDAL)
pip install rasterio tables numpy pandas torch torchvision scikit-learn tqdm

# Download MARIDA dataset
# Extract to data/ folder

# Run spectral extraction (rasterio version)
python utils/spectral_extraction_rasterio.py --type s2

# Train U-Net
cd semantic_segmentation/unet
python train.py

# Train ResNet (rasterio version)
cd multi-label/resnet
python train_rasterio.py --batch 8 --num_workers 0 --epochs 20
```

### Advanced Usage

#### Custom Training Configuration
```bash
# U-Net with custom parameters
python train.py --epochs 50 --batch 16 --lr 1e-4 --hidden_channels 32

# ResNet with custom parameters
python train_rasterio.py --epochs 30 --batch 16 --lr 1e-4 --weight_param 2.0
```

#### Feature Engineering for Random Forest
```bash
# Generate spectral indices
cd semantic_segmentation/random_forest
python engineering_patches.py --type indices

# Generate texture features
python engineering_patches.py --type texture

# Extract features to HDF5
python ../../utils/spectral_extraction_rasterio.py --type indices
python ../../utils/spectral_extraction_rasterio.py --type texture

# Train Random Forest
python train_eval.py
```

### Monitoring Training Progress
```bash
# Start TensorBoard
tensorboard --logdir logs/

# Navigate to http://localhost:6006
```

---

## Research Contributions

### Novel Aspects
1. **Comprehensive Benchmark**: First large-scale annotated dataset for marine debris detection from satellite imagery
2. **Multi-Modal Approach**: Integration of spectral, spatial, and textural features
3. **Weakly Supervised Learning**: Addressing incomplete multi-label annotations
4. **Scalable Implementation**: Rasterio-based implementation for improved compatibility

### Technical Innovations
1. **Adaptive Class Weighting**: Novel weighting scheme for extreme class imbalance
2. **Multi-Scale Feature Fusion**: Combining pixel-level and patch-level approaches
3. **Robust Data Augmentation**: Rotation and flip augmentations preserving spectral properties

### Environmental Impact
- **Global Monitoring**: Enables large-scale marine debris monitoring
- **Early Warning System**: Potential for real-time debris detection
- **Policy Support**: Provides quantitative data for environmental policy

### Future Research Directions
1. **Temporal Analysis**: Multi-temporal change detection
2. **Transfer Learning**: Adaptation to different geographic regions
3. **Real-Time Processing**: Edge computing implementations
4. **Multi-Sensor Fusion**: Integration with other satellite sensors

---

## Citation

If you use this work in your research, please cite:

```bibtex
@article{kikaki2022marida,
  title={MARIDA: A benchmark for Marine Debris detection from Sentinel-2 remote sensing data},
  author={Kikaki, Katerina and Kakogeorgiou, Ioannis and Mikeli, Paraskevi and Raitsos, Dionysios E and Karantzalos, Konstantinos},
  journal={PLoS ONE},
  volume={17},
  number={1},
  pages={e0262247},
  year={2022},
  publisher={Public Library of Science},
  doi={10.1371/journal.pone.0262247}
}
```

---

## License and Acknowledgments

This project is licensed under the MIT License. The MARIDA dataset is available under Creative Commons Attribution 4.0 International License.

**Acknowledgments:**
- European Space Agency (ESA) for Sentinel-2 data
- Google Earth Engine for data processing infrastructure
- Research communities contributing to marine debris monitoring

---

