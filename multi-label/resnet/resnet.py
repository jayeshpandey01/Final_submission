
import torch.nn as nn
import torch.nn.init as init
from torchvision import models

def weights_init_kaiming(m):
    classname = m.__class__.__name__
    if classname.find('Conv2d') != -1 or type(m) == nn.Linear:
        init.kaiming_normal_(m.weight.data)

class ResNet(nn.Module):
    def __init__(self, input_bands = 11, output_classes = 11):
        super().__init__()

        resnet = models.resnet50(pretrained=False)
        
        # Encoder
        self.encoder = nn.Sequential(
                        nn.Conv2d(input_bands, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False),
                        resnet.bn1,
                        resnet.relu,
                        resnet.maxpool,
                        resnet.layer1,
                        resnet.layer2,
                        resnet.layer3,
                        resnet.layer4,
                        resnet.avgpool)
        
        # Classification Layer
        self.fc = nn.Linear(2048, output_classes)

        self.apply(weights_init_kaiming)

    def forward(self, x):
        # Encoder
        x = self.encoder(x)
        x = x.view(x.size(0), -1)
        
        # Classification Layer
        logits = self.fc(x)

        return logits