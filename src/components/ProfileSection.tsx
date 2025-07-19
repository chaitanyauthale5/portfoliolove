import { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ProfileSection = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        setIsEditing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setIsEditing(false);
  };

  return (
    <section id="profile" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          Profile
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full"></div>
      </div>

      <Card className="glass-card border-glass-border max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden glass-card border-2 border-primary/20">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted/20">
                  <Camera className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
            
            {/* Edit button */}
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full glass-card hover:bg-primary/20"
              onClick={() => {
                if (profileImage) {
                  setIsEditing(!isEditing);
                } else {
                  fileInputRef.current?.click();
                }
              }}
            >
              <Camera size={16} />
            </Button>
          </div>

          {isEditing && (
            <div className="flex justify-center gap-2 mb-4">
              <Button
                size="sm"
                variant="outline"
                className="glass-card hover:bg-primary/20"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={16} className="mr-2" />
                Change
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="glass-card hover:bg-destructive/20 text-destructive"
                onClick={removeImage}
              >
                <X size={16} className="mr-2" />
                Remove
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <h3 className="text-xl font-semibold text-foreground mb-2">Alex Chen</h3>
          <p className="text-muted-foreground">
            {profileImage ? 'Profile picture updated!' : 'Click the camera icon to add a profile picture'}
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfileSection;